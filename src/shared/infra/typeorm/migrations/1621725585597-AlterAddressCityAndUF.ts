import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterAddressCityAndUF1621725585597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "adresses",
      new TableColumn({
        name: "city",
        type: "varchar",
      })
    );

    await queryRunner.addColumn(
      "adresses",
      new TableColumn({
        name: "uf",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("adresses", "uf");
    await queryRunner.dropColumn("adresses", "city");
  }
}
