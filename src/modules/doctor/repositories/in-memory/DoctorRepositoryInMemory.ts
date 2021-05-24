import { ICreateDoctorDTO } from "@modules/doctor/dtos/ICreateDoctorDTO";
import { Doctor } from "@modules/doctor/entities/Doctor";

import { IDoctorRepository, IQueryParams } from "../IDoctorRepository";

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

  async findAvailable({ name, crm }: IQueryParams): Promise<Doctor[]> {
    const doctorAvailable = this.doctors.filter(
      (doctor) => doctor.isActive === true
    );

    if (name) {
      doctorAvailable.filter((doctor) => doctor.name === name);
    }

    if (crm) {
      doctorAvailable.filter((doctor) => doctor.CRM === crm);
    }

    return doctorAvailable;
  }
}

export { DoctorRepositoryInMemory };
