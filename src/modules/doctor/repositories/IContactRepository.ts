import { ICreateContactDTO } from "../dtos/ICreateContctDTO";
import { Contact } from "../entities/Contact";

interface IContactRepository {
  create({
    ddd,
    number,
    type_contact,
    doctor_id,
  }: ICreateContactDTO): Promise<Contact>;
}

export { IContactRepository };
