import { container } from "tsyringe";

import { Doctor } from "@modules/doctor/entities/Doctor";
import { IContactRepository } from "@modules/doctor/repositories/IContactRepository";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";
import { ISpecialtyRepository } from "@modules/doctor/repositories/ISpecialtyRepository";
import { CreateAddressUseCase } from "@modules/doctor/useCases/createAddress/CreateAddressUseCase";
import { AppError } from "@shared/errors/AppError";

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

class CreateDoctorUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private specialtyRepository: ISpecialtyRepository,
    private contactRepository: IContactRepository
  ) {}
  async execute({
    name,
    CRM,
    cep,
    specialties,
    contact,
  }: IRequest): Promise<Doctor> {
    const doctorAlreadyExists = await this.doctorRepository.findByCRM(CRM);

    if (doctorAlreadyExists) {
      throw new AppError("CRM already used ");
    }

    if (specialties.length < 2) {
      throw new AppError("The doctor needs to have more than one specialty");
    }

    const addressUseCase = container.resolve(CreateAddressUseCase);

    const address = await addressUseCase.execute(cep);

    const specialtyRegistered = await this.specialtyRepository.finByIds(
      specialties
    );
    const doctor = await this.doctorRepository.create({
      name,
      CRM,
      specialties: specialtyRegistered,
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
