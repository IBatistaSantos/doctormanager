import { v4 as uuidV4 } from "uuid";

import { Doctor } from "./Doctor";

enum TypeContact {
  celular = "Celular",
  telefone_fixo = "Telefone fixo",
}

class Contact {
  id: string;
  ddd: string;
  number: string;
  type_contact: TypeContact;
  doctor: Doctor;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Contact };
