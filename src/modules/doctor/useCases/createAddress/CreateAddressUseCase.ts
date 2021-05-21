import axios from "axios";

import { Address } from "@modules/doctor/entities/Address";
import { IAddressRepository } from "@modules/doctor/repositories/IAddressRepository";
import { AppError } from "@shared/errors/AppError";

interface IResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}
class CreateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}
  async execute(cepSearch: string): Promise<Address> {
    try {
      const { data } = await axios.get<IResponse>(
        `viacep.com.br/ws/${cepSearch}/json/`
      );

      const { cep, logradouro, complemento, bairro, localidade, uf } = data;

      const address = await this.addressRepository.create({
        address: logradouro,
        cep,
        complement: complemento,
        neighborhood: bairro,
        city: localidade,
        uf,
      });

      return address;
    } catch (error) {
      throw new AppError(
        "Ocorreu um erro ao Cadastrar seu endereço, tente novamente. Caso o erro persita, entre em contato com o suporte"
      );
    }
  }
}

export { CreateAddressUseCase };
