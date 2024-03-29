import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateDoctorSpecialty1621614693557 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "doctor_specialty",
        columns: [
          {
            name: "doctor_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "specialty_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "doctor_specialty",
      new TableForeignKey({
        name: "FKDoctorSpecialty",
        referencedTableName: "doctors",
        referencedColumnNames: ["id"],
        columnNames: ["doctor_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "doctor_specialty",
      new TableForeignKey({
        name: "FKSpecialtyDoctor",
        referencedTableName: "specialties",
        referencedColumnNames: ["id"],
        columnNames: ["specialty_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("doctor_specialty");
  }
}
