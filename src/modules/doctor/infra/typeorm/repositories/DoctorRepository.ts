import { getRepository, Repository } from "typeorm";

import { ICreateDoctorDTO } from "@modules/doctor/dtos/ICreateDoctorDTO";
import { Doctor } from "@modules/doctor/entities/Doctor";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";

import { DoctorTypeorm } from "../entities/DoctorTypeorm";

class DoctorRepository implements IDoctorRepository {
  private repository: Repository<DoctorTypeorm>;

  constructor() {
    this.repository = getRepository(DoctorTypeorm);
  }
  async create({
    name,
    CRM,
    specialties,
    address_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.repository.create({
      name,
      CRM,
      specialties,
      address_id,
    });
    await this.repository.save(doctor);
    return doctor;
  }

  async findByCRM(CRM: string): Promise<Doctor | undefined> {
    const doctor = await this.repository.findOne({ where: { CRM } });
    return doctor;
  }
}

export { DoctorRepository };
