import { v4 as uuidV4 } from "uuid";

import { Doctor } from "./Doctor";

class Contact {
  id: string;
  ddd: string;
  number: string;
  type_contact: string;
  doctor_id: string;
  doctor: Doctor;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Contact };
