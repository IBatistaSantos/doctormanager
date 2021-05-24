import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctor/entities/Doctor";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";

interface IRequest {
  name?: string;
  city?: string;
  uf?: string;
  crm?: string;
  specialties?: string[];
}

@injectable()
class ListDoctorAvailableUseCase {
  constructor(
    @inject("DoctorRepository")
    private doctorRepository: IDoctorRepository
  ) {}
  async execute({
    name,
    city,
    uf,
    crm,
    specialties,
  }: IRequest): Promise<Doctor[]> {
    const listDoctorAvailable = await this.doctorRepository.findAvailable({
      name,
      city,
      uf,
      crm,
      specialties,
    });

    return listDoctorAvailable;
  }
}

export { ListDoctorAvailableUseCase };
