import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterDoctorAddAdressId1621719748682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "doctors",
      new TableColumn({
        name: "address_id",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "doctors",
      new TableForeignKey({
        name: "FKDoctorAddresses",
        referencedTableName: "adresses",
        referencedColumnNames: ["id"],
        columnNames: ["address_id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("doctors", "FKDoctorAddresses");
    await queryRunner.dropColumn("users", "address_id");
  }
}
