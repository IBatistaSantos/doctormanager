import { Column, Entity, PrimaryColumn } from "typeorm";

import { Address } from "@modules/doctor/entities/Address";

@Entity("adresses")
class AddressTypeorm extends Address {
  constructor() {
    super();
  }

  @PrimaryColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  neighborhood: string;
}

export { AddressTypeorm };
