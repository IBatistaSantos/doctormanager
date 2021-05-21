import { ICreateDoctorDTO } from "../dtos/ICreateDoctorDTO";
import { Doctor } from "../entities/Doctor";

interface IDoctorRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
}

export { IDoctorRepository };
