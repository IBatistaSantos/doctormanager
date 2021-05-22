import { Specialty } from "../entities/Specialty";

interface ICreateDoctorDTO {
  name: string;
  CRM: string;
  specialties: Specialty[];
  address_id: string | undefined;
}

export { ICreateDoctorDTO };
