import { AppError } from "@shared/errors/AppError";

import { Specialty } from "../entities/Specialty";
import { ISpecialtyRepository } from "../repositories/ISpecialtyRepository";

interface IRequest {
  name: string;
}
class CreateSpecialtyUseCase {
  constructor(private specialtyRepository: ISpecialtyRepository) {}
  async execute({ name }: IRequest): Promise<Specialty> {
    const specialyExists = await this.specialtyRepository.findByName(name);

    if (specialyExists) {
      throw new AppError("Specialty already registered");
    }
    const specialy = await this.specialtyRepository.create(name);
    return specialy;
  }
}

export { CreateSpecialtyUseCase };
