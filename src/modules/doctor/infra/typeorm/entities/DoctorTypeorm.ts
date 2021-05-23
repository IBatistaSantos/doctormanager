import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Contact } from "@modules/doctor/entities/Contact";
import { Doctor } from "@modules/doctor/entities/Doctor";

import { AddressTypeorm } from "./AddressTypeorm";
import { ContactTypeOrm } from "./ContactTypeorm";
import { SpecialtyTypeormEntity } from "./SpecialyTypeorm";

@Entity("doctors")
class DoctorTypeorm extends Doctor {
  constructor() {
    super();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  CRM: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  address_id: string;

  @OneToOne(() => AddressTypeorm)
  @JoinColumn({ name: "address_id" })
  address: AddressTypeorm;

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
