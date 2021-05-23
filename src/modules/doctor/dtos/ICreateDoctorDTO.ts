import { Specialty } from "../entities/Specialty";

interface ICreateDoctorDTO {
  id?: string;
  name: string;
  CRM: string;
  specialties: Specialty[];
  address_id: string | undefined;
  isActive?: boolean;
}

export { ICreateDoctorDTO };
