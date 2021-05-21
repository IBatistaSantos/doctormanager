import { ICreateDoctorDTO } from "@modules/doctor/dtos/ICreateDoctorDTO";
import { Doctor } from "@modules/doctor/entities/Doctor";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";
import { ISpecialtyRepository } from "@modules/doctor/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  CRM: string;
  cep: string;
  specialties: string[];
  contact?: {
    ddd: number;
    number: string;
    type_contact: string;
  };
}

class CreateDoctorUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private specialtyRepository: ISpecialtyRepository
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

    const specialtyRegistered = await this.specialtyRepository.finByIds(
      specialties
    );
    const doctor = await this.doctorRepository.create({
      name,
      CRM,
      specialties: specialtyRegistered,
    });

    return doctor;
  }
}

export { CreateDoctorUseCase };
