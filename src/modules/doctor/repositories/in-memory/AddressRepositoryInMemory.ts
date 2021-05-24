import { ICreateAddressDTO } from "@modules/doctor/dtos/ICreateAddressDTO";
import { Address } from "@modules/doctor/entities/Address";

import { IAddressRepository } from "../IAddressRepository";

class AddressRepositoryInMemory implements IAddressRepository {
  adresses: Address[] = [];
  async create({
    address,
    cep,
    city,
    complement,
    neighborhood,
    uf,
  }: ICreateAddressDTO): Promise<Address> {
    const addressSave = new Address();

    Object.assign(addressSave, {
      address,
      cep,
      city,
      complement,
      neighborhood,
      uf,
    });

    this.adresses.push(addressSave);
    return addressSave;
  }

  async delete(id: string): Promise<void> {
    const index = this.adresses.findIndex((address) => address.id === id);
    this.adresses.splice(index, 1);
  }
}

export { AddressRepositoryInMemory };
