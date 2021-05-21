import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Contact } from "@modules/doctor/entities/Contact";
import { Doctor } from "@modules/doctor/entities/Doctor";

import { ContactTypeOrm } from "./ContactTypeorm";
import { SpecialtyTypeormEntity } from "./SpecialyTypeorm";

@Entity("doctors")
class DoctorTypeorm extends Doctor {
  constructor() {
    super();
  }

  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  CRM: string;

  @OneToMany(() => ContactTypeOrm, (contact) => contact.doctor)
  contacts: Contact[];

  @ManyToMany(() => SpecialtyTypeormEntity)
  @JoinTable({
    name: "doctor_specialty",
    joinColumns: [{ name: "doctor_id" }],
    inverseJoinColumns: [{ name: "specialty_id" }],
  })
  specialties: SpecialtyTypeormEntity[];

  @CreateDateColumn()
  created_at: Date;
}

export { DoctorTypeorm };
