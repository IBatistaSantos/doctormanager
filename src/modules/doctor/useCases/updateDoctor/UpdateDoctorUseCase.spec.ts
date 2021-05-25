import { AddressRepositoryInMemory } from "@modules/doctor/repositories/in-memory/AddressRepositoryInMemory";
import { ContactRepositoryInMemory } from "@modules/doctor/repositories/in-memory/ContactRepositoryInMemory";
import { DoctorRepositoryInMemory } from "@modules/doctor/repositories/in-memory/DoctorRepositoryInMemory";
import { SpecialtyRepositoryInMemory } from "@modules/doctor/repositories/in-memory/SpecialyRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { UpdateDoctorUseCase } from "./UpdateDoctorUseCase";

let specialtyRepository: SpecialtyRepositoryInMemory;
let doctorRepository: DoctorRepositoryInMemory;
let contactRepository: ContactRepositoryInMemory;
let addressRepository: AddressRepositoryInMemory;

let updateDoctorUseCase: UpdateDoctorUseCase;

describe("Update Doctor", () => {
  beforeEach(() => {
    specialtyRepository = new SpecialtyRepositoryInMemory();
    doctorRepository = new DoctorRepositoryInMemory();
    contactRepository = new ContactRepositoryInMemory();
    addressRepository = new AddressRepositoryInMemory();

    updateDoctorUseCase = new UpdateDoctorUseCase(
      doctorRepository,
      specialtyRepository,
      contactRepository,
      addressRepository
    );
  });

  it("should be able to update a doctor", async () => {
    const specialty1 = await specialtyRepository.create("Cirurgia Clinica");
    const specialty2 = await specialtyRepository.create("Cirurgia UTI");

    const doctor = await doctorRepository.create({
      name: "Duane",
      CRM: "CRM TEST",
      address_id: "",
      specialties: [specialty1, specialty2],
    });

    await updateDoctorUseCase.execute({
      id: doctor.id,
      name: "Israel",
      CRM: "CRM TEST UPDATE",
    });

    expect(doctor.name).toEqual("Israel");
    expect(doctor.CRM).toEqual("CRM TEST UPDATE");
  });

  it("should not be able to udatee doctor not exists", async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: "not-exist",
        name: "Ernest",
        CRM: "CRM Duplicaded",
        cep: "41150320",
      })
    ).rejects.toEqual(new AppError("Doctor not found"));
  });
});
