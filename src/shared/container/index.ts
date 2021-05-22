import { container } from "tsyringe";

import { AddressRepository } from "@modules/doctor/infra/typeorm/repositories/AddressRepository";
import { ContactRepository } from "@modules/doctor/infra/typeorm/repositories/ContactRepository";
import { DoctorRepository } from "@modules/doctor/infra/typeorm/repositories/DoctorRepository";
import { SpecialtyRepository } from "@modules/doctor/infra/typeorm/repositories/SpecialyRepository";
import { IAddressRepository } from "@modules/doctor/repositories/IAddressRepository";
import { IContactRepository } from "@modules/doctor/repositories/IContactRepository";
import { IDoctorRepository } from "@modules/doctor/repositories/IDoctorRepository";
import { ISpecialtyRepository } from "@modules/doctor/repositories/ISpecialtyRepository";

container.registerSingleton<IDoctorRepository>(
  "DoctorRepository",
  DoctorRepository
);
container.registerSingleton<ISpecialtyRepository>(
  "SpecialtyRepository",
  SpecialtyRepository
);
container.registerSingleton<IContactRepository>(
  "ContactRepository",
  ContactRepository
);

container.registerSingleton<IAddressRepository>(
  "AddressRepository",
  AddressRepository
);
