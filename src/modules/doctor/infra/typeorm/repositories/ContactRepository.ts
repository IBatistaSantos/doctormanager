import { getRepository, Repository } from "typeorm";

import { ICreateContactDTO } from "@modules/doctor/dtos/ICreateContctDTO";
import { Contact } from "@modules/doctor/entities/Contact";
import { IContactRepository } from "@modules/doctor/repositories/IContactRepository";

import { ContactTypeOrm } from "../entities/ContactTypeorm";

class ContactRepository implements IContactRepository {
  private repository: Repository<ContactTypeOrm>;

  constructor() {
    this.repository = getRepository(ContactTypeOrm);
  }
  async create({
    ddd,
    number,
    type_contact,
    doctor_id,
  }: ICreateContactDTO): Promise<Contact> {
    const contact = this.repository.create({
      ddd,
      number,
      type_contact,
      doctor_id,
    });

    await this.repository.save(contact);
    return contact;
  }
}

export { ContactRepository };
