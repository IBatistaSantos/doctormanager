import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Contact } from "@modules/doctor/entities/Contact";

import { DoctorTypeorm } from "./DoctorTypeorm";

@Entity("contacts")
class ContactTypeOrm extends Contact {
  constructor() {
    super();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  ddd: string;

  @Column()
  number: string;

  @Column({ type: "enum", enum: ["Celular", "Telefone Fixo"] })
  type_contact: string;

  @Column()
  doctor_id: string;

  @ManyToOne(() => DoctorTypeorm, (doctor) => doctor.contacts)
  @JoinColumn({ name: "doctor_id" })
  doctor: DoctorTypeorm;

  @Column()
  created_at: Date;
}

export { ContactTypeOrm };
