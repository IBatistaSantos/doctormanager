import { ICreateDoctorDTO } from "@modules/doctor/dtos/ICreateDoctorDTO";
import { Doctor } from "@modules/doctor/entities/Doctor";

import { IDoctorRepository } from "../IDoctorRepository";

class DoctorRepositoryInMemory implements IDoctorRepository {
  doctors: Doctor[] = [];
  async create({
    name,
    CRM,
    specialties,
    address_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();

    Object.assign(doctor, {
      name,
      CRM,
      specialties,
      address_id,
      isActive: true,
    });
    this.doctors.push(doctor);

    return doctor;
  }
  async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.doctors.find((doctor) => doctor.CRM === crm);
  }

  async findById(id: string): Promise<Doctor | undefined> {
    return this.doctors.find((doctor) => doctor.id === id);
  }
}

export { DoctorRepositoryInMemory };
