import { Specialty } from "../entities/Specialty";

interface ISpecialtyRepository {
  findByName(name: string): Promise<Specialty | undefined>;
  create(name: string): Promise<Specialty>;
}

export { ISpecialtyRepository };
