import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctor/entities/Doctor";
import { IAddressRepository } from "@modules/doctor/repositories/IAddressRepository";
import { IContactRepository } from "@modules/doctor/repositories/IContactRepository";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";
import { ISpecialtyRepository } from "@modules/doctor/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

import { SeachCep } from "../../utils/searchAddressCep";

interface IRequest {
  id: string;
  name?: string;
  CRM?: string;
  cep?: string;
  isActive?: boolean;
  specialties?: string[];
  contact?: {
    ddd: string;
    number: string;
    type_contact: string;
  };
}

@injectable()
class UpdateDoctorUseCase {
  constructor(
    @inject("DoctorRepository")
    private doctorRepository: IDoctorRepository,
    @inject("SpecialtyRepository")
    private specialtyRepository: ISpecialtyRepository,
    @inject("ContactRepository")
    private contactRepository: IContactRepository,
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}
  async execute({
    id,
    name,
    CRM,
    cep,
    isActive,
    specialties,
    contact,
  }: IRequest): Promise<Doctor> {
    const cepSeach = cep;
    const doctorExists = await this.doctorRepository.findById(id);

    if (!doctorExists) {
      throw new AppError("Doctor not found");
    }

    if (name) {
      doctorExists.name = name;
    }

    if (CRM) {
      const doctorAlreadyExists = await this.doctorRepository.findByCRM(CRM);

      if (doctorAlreadyExists) {
        throw new AppError("CRM already used ");
      }

      doctorExists.CRM = CRM;
    }

    if (specialties) {
      const specialtyRegistered = await this.specialtyRepository.finByIds(
        specialties
      );

      doctorExists.specialties = specialtyRegistered;
    }

    if (cepSeach) {
      if (doctorExists.address_id) {
        await this.addressRepository.delete(doctorExists.address_id);
      }

      const seachrCep = new SeachCep();
      const { address, cep, city, neighborhood, uf, complement } =
        await seachrCep.searchAddressCep(cepSeach);
      const addressSave = await this.addressRepository.create({
        address,
        cep,
        city,
        neighborhood,
        uf,
        complement,
      });

      doctorExists.address_id = addressSave.id;
    }

    if (isActive) {
      doctorExists.isActive = isActive;
    }

    const doctor = await this.doctorRepository.create(doctorExists);

    if (contact) {
      await this.contactRepository.create({
        ddd: contact.ddd,
        number: contact.number,
        doctor_id: doctor.id,
        type_contact: contact.type_contact,
      });
    }

    return doctor;
  }
}

export { UpdateDoctorUseCase };
