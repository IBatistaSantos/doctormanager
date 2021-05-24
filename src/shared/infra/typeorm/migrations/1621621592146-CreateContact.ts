import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContact1621621592146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contacts",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "ddd",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
          },
          {
            name: "type_contact",
            type: "enum",
            enum: ["Celular", "Telefone Fixo"],
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "doctor_id",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "FKContactDoctor",
            referencedTableName: "doctors",
            referencedColumnNames: ["id"],
            columnNames: ["doctor_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("contacts");
  }
}
