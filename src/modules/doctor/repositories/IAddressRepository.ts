import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { Address } from "../entities/Address";

interface IAddressRepository {
  create({
    address,
    cep,
    city,
    complement,
    neighborhood,
    uf,
  }: ICreateAddressDTO): Promise<Address>;

  delete(id: string): Promise<void>;
}
export { IAddressRepository };
