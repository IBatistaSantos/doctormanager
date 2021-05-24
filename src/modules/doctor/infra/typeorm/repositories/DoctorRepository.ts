/* eslint-disable no-unused-expressions */
import { getRepository, Repository } from "typeorm";

import { ICreateDoctorDTO } from "@modules/doctor/dtos/ICreateDoctorDTO";
import { Doctor } from "@modules/doctor/entities/Doctor";
import {
  IDoctorRepository,
  IQueryParams,
} from "@modules/doctor/repositories/IDoctorRepository";

import { DoctorTypeorm } from "../entities/DoctorTypeorm";

class DoctorRepository implements IDoctorRepository {
  private repository: Repository<DoctorTypeorm>;

  constructor() {
    this.repository = getRepository(DoctorTypeorm);
  }
  async findAvailable({
    name,
    city,
    uf,
    crm,
    specialties,
  }: IQueryParams): Promise<Doctor[]> {
    const doctorsQuery = this.repository
      .createQueryBuilder("d")
      .where("d.isActive = :isActive", { isActive: true });

    if (name) {
      doctorsQuery.andWhere("d.name = :name", { name });
    }

    if (crm) {
      doctorsQuery.andWhere("d.CRM = :crm", { crm });
    }

    if (city && uf) {
      doctorsQuery.innerJoinAndSelect(
        "d.address",
        "adresses",
        "adresses.city = :city AND adresses.uf =:uf",
        {
          city,
          uf,
        }
      );
    }

    if (city && !uf) {
      doctorsQuery.leftJoinAndSelect(
        "d.address",
        "adresses",
        "adresses.city = :city",
        {
          city,
        }
      );
    }

    if (uf && !city) {
      doctorsQuery.leftJoinAndSelect(
        "d.address",
        "adresses",
        "adresses.uf = :uf",
        {
          uf,
        }
      );
    }

    if (specialties) {
      doctorsQuery.innerJoinAndSelect(
        "d.specialties",
        "specialties",
        "specialties.name IN (:...specialties)",
        { specialties }
      );
    }

    const doctors = await doctorsQuery.getMany();
    return doctors;
  }
  async findById(id: string): Promise<Doctor | undefined> {
    const doctor = await this.repository.findOne(id);
    return doctor;
  }
  async create({
    id,
    name,
    CRM,
    specialties,
    address_id,
    isActive,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.repository.create({
      id,
      name,
      CRM,
      specialties,
      address_id,
      isActive,
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
