import { Specialty } from "@modules/doctor/entities/Specialty";

import { ISpecialtyRepository } from "../ISpecialtyRepository";

class SpecialtyRepositoryInMemory implements ISpecialtyRepository {
  specialty: Specialty[] = [];
  async findByName(name: string): Promise<Specialty | undefined> {
    return this.specialty.find((specialy) => specialy.name === name);
  }

  async finByIds(ids: string[]): Promise<Specialty[]> {
    const allSpecialty = this.specialty.filter((specialty) =>
      ids.includes(specialty.id as string)
    );
    return allSpecialty;
  }
  async create(name: string): Promise<Specialty> {
    const specialy = new Specialty();

    Object.assign(specialy, { name });
    this.specialty.push(specialy);
    return specialy;
  }
}

export { SpecialtyRepositoryInMemory };
