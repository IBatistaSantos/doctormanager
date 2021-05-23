import { DoctorRepositoryInMemory } from "@modules/doctor/repositories/in-memory/DoctorRepositoryInMemory";
import { SpecialtyRepositoryInMemory } from "@modules/doctor/repositories/in-memory/SpecialyRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleleDoctorUseCase } from "./DeleteDoctorUseCase";

let specialtyRepository: SpecialtyRepositoryInMemory;
let doctorRepository: DoctorRepositoryInMemory;

let deleteDoctorUseCase: DeleleDoctorUseCase;

describe("Delete Doctor", () => {
  beforeEach(() => {
    specialtyRepository = new SpecialtyRepositoryInMemory();
    doctorRepository = new DoctorRepositoryInMemory();
    deleteDoctorUseCase = new DeleleDoctorUseCase(doctorRepository);
  });
  it("should be able to delete a doctor", async () => {
    const specialty1 = await specialtyRepository.create("Cirurgia Clinica");
    const specialty2 = await specialtyRepository.create("Cirurgia UTI");

    const specialties = [specialty1, specialty2];

    const doctor = await doctorRepository.create({
      name: "Lucinda Roberson",
      CRM: "136848686",
      specialties,
      address_id: "",
    });

    await deleteDoctorUseCase.execute(doctor.id);
    expect(doctor.isActive).toEqual(false);
  });

  it("should not be able to delete doctor does not exist", async () => {
    await expect(deleteDoctorUseCase.execute("non-existing")).rejects.toEqual(
      new AppError("Doctor not found")
    );
  });
});
