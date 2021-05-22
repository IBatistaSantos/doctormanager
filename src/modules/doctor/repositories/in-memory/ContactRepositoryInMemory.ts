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
  }: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, { ddd, number, type_contact, doctor_id });
    this.contacts.push(contact);
    return contact;
  }
}

export { ContactRepositoryInMemory };
