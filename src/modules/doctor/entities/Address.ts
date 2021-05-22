import { v4 as uuidV4 } from "uuid";

class Address {
  id: string;
  address: string;
  cep: string;
  city: string;
  neighborhood: string;
  uf: string;
  complement: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Address };
