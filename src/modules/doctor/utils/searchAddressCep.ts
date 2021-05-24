import axios from "axios";

import { AppError } from "@shared/errors/AppError";

interface IResponse {
  cep: string;
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  complement?: string;
}
interface IReturnRequest {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default {
  async searchAddressCep(cepSearch: string): Promise<IResponse> {
    try {
      const { data } = await axios.get<IReturnRequest>(
        `https://viacep.com.br//ws/${cepSearch}/json/`
      );

      const { cep, logradouro, complemento, bairro, localidade, uf } = data;
      const response: IResponse = {
        address: logradouro,
        cep,
        complement: complemento,
        neighborhood: bairro,
        city: localidade,
        uf,
      };

      return response;
    } catch (error) {
      throw new AppError(
        "Ocorreu um erro ao Cadastrar seu endereço, tente novamente. Caso o erro persita, entre em contato com o suporte"
      );
    }
  },
};
