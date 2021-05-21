import { AppError } from "@shared/errors/AppError";

import { SpecialtyRepositoryInMemory } from "../../repositories/in-memory/SpecialyRepositoryInMemory";
import { CreateSpecialtyUseCase } from "./CreateSpecialtyUseCase";

let specialtyRepository: SpecialtyRepositoryInMemory;
let createSpecialyUseCase: CreateSpecialtyUseCase;

describe("Create Specialy", () => {
  beforeEach(() => {
    specialtyRepository = new SpecialtyRepositoryInMemory();
    createSpecialyUseCase = new CreateSpecialtyUseCase(specialtyRepository);
  });
  it("should be able to create a new specialy", async () => {
    const specialy = await createSpecialyUseCase.execute({
      name: "Cirurgia Clinica",
    });

    expect(specialy).toHaveProperty("id");
  });

  it("should not be able to create specialy with exists name", async () => {
    await createSpecialyUseCase.execute({
      name: "Cirurgia Clinica",
    });

    await expect(
      createSpecialyUseCase.execute({
        name: "Cirurgia Clinica",
      })
    ).rejects.toEqual(new AppError("Specialty already registered"));
  });
});
