import { ICreateDoctorDTO } from "../dtos/ICreateDoctorDTO";
import { Doctor } from "../entities/Doctor";

interface IQueryParams {
  name?: string;
  city?: string;
  uf?: string;
  crm?: string;
  specialties?: string[];
}

interface IDoctorRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  findById(id: string): Promise<Doctor | undefined>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
  findAvailable({
    name,
    city,
    uf,
    crm,
    specialties,
  }: IQueryParams): Promise<Doctor[]>;
}

export { IDoctorRepository, IQueryParams };
