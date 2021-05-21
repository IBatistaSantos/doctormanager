import { getRepository, Repository } from "typeorm";

import { ICreateAddressDTO } from "@modules/doctor/dtos/ICreateAddressDTO";
import { Address } from "@modules/doctor/entities/Address";
import { IAddressRepository } from "@modules/doctor/repositories/IAddressRepository";

import { AddressTypeorm } from "../entities/AddressTypeorm";

class AddressRepository implements IAddressRepository {
  private repository: Repository<AddressTypeorm>;

  constructor() {
    this.repository = getRepository(AddressTypeorm);
  }
  async create({
    address,
    cep,
    city,
    complement,
    neighborhood,
    uf,
  }: ICreateAddressDTO): Promise<Address> {
    const addressSave = this.repository.create({
      address,
      cep,
      city,
      complement,
      neighborhood,
      uf,
    });

    await this.repository.save(addressSave);
    return addressSave;
  }
}

export { AddressRepository };
