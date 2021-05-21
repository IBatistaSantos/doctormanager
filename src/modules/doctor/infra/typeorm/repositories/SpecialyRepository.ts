import { getRepository, Repository } from "typeorm";

import { Specialty } from "@modules/doctor/entities/Specialty";
import { ISpecialtyRepository } from "@modules/doctor/repositories/ISpecialtyRepository";

import { SpecialtyTypeormEntity } from "../entities/SpecialyTypeorm";

class SpecialtyRepository implements ISpecialtyRepository {
  private repository: Repository<SpecialtyTypeormEntity>;

  constructor() {
    this.repository = getRepository(SpecialtyTypeormEntity);
  }
  async finByIds(ids: string[]): Promise<Specialty[]> {
    const specialties = await this.repository.findByIds(ids);
    return specialties;
  }
  async findByName(name: string): Promise<Specialty | undefined> {
    const specialy = await this.repository.findOne({ where: name });
    return specialy;
  }
  async create(name: string): Promise<Specialty> {
    const specialy = this.repository.create({ name });
    await this.repository.save(specialy);

    return specialy;
  }
}

export { SpecialtyRepository };
