import { ICreateContactDTO } from "../dtos/ICreateContctDTO";

interface IContactRepository {
  create({
    ddd,
    number,
    type_contact,
    doctor_id,
  }: ICreateContactDTO): Promise<void>;
}

export { IContactRepository };
