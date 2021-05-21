interface ICreateAddressDTO {
  cep: string;
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  complement?: string;
}

export { ICreateAddressDTO };
