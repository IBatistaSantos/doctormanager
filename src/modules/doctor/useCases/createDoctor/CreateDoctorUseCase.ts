import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctor/entities/Doctor";
import { IAddressRepository } from "@modules/doctor/repositories/IAddressRepository";
import { IContactRepository } from "@modules/doctor/repositories/IContactRepository";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";
import { ISpecialtyRepository } from "@modules/doctor/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

import seachrCep from "../../utils/searchAddressCep";

interface IRequest {
  name: string;
  CRM: string;
  cep: string;
  specialties: string[];
  contact?: {
    ddd: string;
    number: string;
    type_contact: string;
  };
}

@injectable()
class CreateDoctorUseCase {
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
    name,
    CRM,
    cep,
    specialties,
    contact,
  }: IRequest): Promise<Doctor> {
    let addressId;
    const cepSeach = cep;
    const doctorAlreadyExists = await this.doctorRepository.findByCRM(CRM);

    if (doctorAlreadyExists) {
      throw new AppError("CRM already used ");
    }

    if (specialties.length < 2) {
      throw new AppError("The doctor needs to have more than one specialty");
    }

    if (cepSeach) {
      const { searchAddressCep } = seachrCep;
      const { address, cep, city, neighborhood, uf, complement } =
        await searchAddressCep(cepSeach);
      const addressSave = await this.addressRepository.create({
        address,
        cep,
        city,
        neighborhood,
        uf,
        complement,
      });
      addressId = addressSave.id;
    }

    const specialtyRegistered = await this.specialtyRepository.finByIds(
      specialties
    );
    const doctor = await this.doctorRepository.create({
      name,
      CRM,
      specialties: specialtyRegistered,
      address_id: addressId,
    });

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

export { CreateDoctorUseCase };
