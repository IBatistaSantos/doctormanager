import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1621624712890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "adresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "cep",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adresses");
  }
}
