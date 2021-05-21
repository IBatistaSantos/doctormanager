import { ContactRepositoryInMemory } from "@modules/doctor/repositories/in-memory/ContactRepositoryInMemory";
import { DoctorRepositoryInMemory } from "@modules/doctor/repositories/in-memory/DoctorRepositoryInMemory";
import { SpecialtyRepositoryInMemory } from "@modules/doctor/repositories/in-memory/SpecialyRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

let specialtyRepository: SpecialtyRepositoryInMemory;
let doctorRepository: DoctorRepositoryInMemory;
let contactRepository: ContactRepositoryInMemory;

let createDoctorUseCase: CreateDoctorUseCase;
describe("Create Doctor", () => {
  beforeEach(() => {
    specialtyRepository = new SpecialtyRepositoryInMemory();
    doctorRepository = new DoctorRepositoryInMemory();
    contactRepository = new ContactRepositoryInMemory();
    createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      specialtyRepository,
      contactRepository
    );
  });
  it("should be able to create a new doctor", async () => {
    const specialty1 = await specialtyRepository.create("Cirurgia Clinica");
    const specialty2 = await specialtyRepository.create("Cirurgia UTI");

    const specialties = [specialty1.id, specialty2.id];

    const doctor = await createDoctorUseCase.execute({
      name: "Duane",
      CRM: "CRM TEST",
      specialties,
      cep: "41150320",
      contact: {
        ddd: "71",
        number: "70.7841",
        type_contact: "Celular",
      },
    });
    console.log(doctor);
    expect(doctor).toHaveProperty("id");
    expect(doctor.specialties).toHaveLength(2);
  });

  it("should not be able to create doctor with exists CRM", async () => {
    const specialty1 = await specialtyRepository.create("Cirurgia Clinica");
    const specialty2 = await specialtyRepository.create("Cirurgia UTI");
    const specialties = [specialty1.id, specialty2.id];
    await createDoctorUseCase.execute({
      name: "Duane",
      CRM: "CRM Duplicaded",
      specialties,
      cep: "41150320",
    });

    await expect(
      createDoctorUseCase.execute({
        name: "Ernest",
        CRM: "CRM Duplicaded",
        specialties,
        cep: "41150320",
      })
    ).rejects.toEqual(new AppError("CRM already used "));
  });

  it("should not be able to create doctor with less than two specialties", async () => {
    const specialty1 = await specialtyRepository.create("Cirurgia Clinica");
    const specialties = [specialty1.id];

    await expect(
      createDoctorUseCase.execute({
        name: "Luis",
        CRM: "cast",
        specialties,
        cep: "41150320",
      })
    ).rejects.toEqual(
      new AppError("The doctor needs to have more than one specialty")
    );
  });
});
