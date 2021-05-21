import { v4 as uuidV4 } from "uuid";

import { SpecialtyTypeormEntity } from "../../../../modules/doctor/infra/typeorm/entities/SpecialyTypeorm";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  await connection
    .createQueryBuilder()
    .insert()
    .into(SpecialtyTypeormEntity)
    .values([
      { id: uuidV4(), name: "Alergologia" },
      { id: uuidV4(), name: "Angiologia" },
      { id: uuidV4(), name: "Buco maxilo" },
      { id: uuidV4(), name: "Cardiologia clínca" },
      { id: uuidV4(), name: "Cardiologia infantil" },
      { id: uuidV4(), name: "Cirurgia cabeça e pescoço" },
      { id: uuidV4(), name: "Cirurgia cardíaca" },
      { id: uuidV4(), name: "Cirurgia de tórax" },
    ])
    .execute();

  await connection.close();
}

create().then(() => {
  console.log("Specialties created successfully");
});
