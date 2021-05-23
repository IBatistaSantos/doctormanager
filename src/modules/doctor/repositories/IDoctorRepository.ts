import { ICreateDoctorDTO } from "../dtos/ICreateDoctorDTO";
import { Doctor } from "../entities/Doctor";

interface IDoctorRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  findById(id: string): Promise<Doctor | undefined>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
}

export { IDoctorRepository };
