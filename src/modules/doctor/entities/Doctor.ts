import { v4 as uuidV4 } from "uuid";

import { Specialty } from "./Specialty";

class Doctor {
  id: string;
  name: string;
  CRM: string;
  specialties: Specialty[];
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Doctor };
