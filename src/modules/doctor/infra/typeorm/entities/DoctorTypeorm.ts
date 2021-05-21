import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";

import { Doctor } from "@modules/doctor/entities/Doctor";
import { Specialty } from "@modules/doctor/entities/Specialty";

@Entity("doctors")
class DoctorTypeorm extends Doctor {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  CRM: string;

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: "doctor_specialty",
    joinColumns: [{ name: "doctor_id" }],
    inverseJoinColumns: [{ name: "specialty_id" }],
  })
  specialties: Specialty[];

  @CreateDateColumn()
  created_at: Date;
}

export { DoctorTypeorm };
