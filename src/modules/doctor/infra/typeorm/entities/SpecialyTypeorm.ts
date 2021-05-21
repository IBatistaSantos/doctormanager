import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import { Specialty } from "../../../entities/Specialty";

@Entity("specialties")
class SpecialtyTypeormEntity extends Specialty {
  constructor() {
    super();
  }
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}

export { SpecialtyTypeormEntity };
