import { Specialty } from "../entities/Specialty";

enum TypeContact {
  celular = "CELULAR",
  telefone_fixo = "TELEFONE FIXO",
}

interface ICreateDoctorDTO {
  name: string;
  CRM: string;
  specialties: Specialty[];
}

export { ICreateDoctorDTO, TypeContact };
