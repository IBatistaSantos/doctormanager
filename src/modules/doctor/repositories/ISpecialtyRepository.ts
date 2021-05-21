import { Specialty } from "../entities/Specialty";

interface ISpecialtyRepository {
  findByName(name: string): Promise<Specialty | undefined>;
  create(name: string): Promise<Specialty>;
  finByIds(ids: string[]): Promise<Specialty[]>;
}

export { ISpecialtyRepository };
