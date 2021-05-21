import { Specialty } from "../entities/Specialty";

interface ICreateDoctorDTO {
  name: string;
  CRM: string;
  specialties: Specialty[];
}

export { ICreateDoctorDTO };
