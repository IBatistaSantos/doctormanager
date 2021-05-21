import { ICreateContactDTO } from "@modules/doctor/dtos/ICreateContctDTO";
import { Contact } from "@modules/doctor/entities/Contact";

import { IContactRepository } from "../IContactRepository";

class ContactRepositoryInMemory implements IContactRepository {
  contacts: Contact[] = [];
  async create({
    ddd,
    number,
    type_contact,
    doctor_id,
  }: ICreateContactDTO): Promise<void> {
    const contact = new Contact();

    Object.assign(contact, { ddd, number, type_contact, doctor_id });
    this.contacts.push(contact);
  }
}

export { ContactRepositoryInMemory };
