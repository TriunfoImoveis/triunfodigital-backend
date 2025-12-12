import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addPartnershipFieldsToSale1770000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "sales",
      new TableColumn({
        name: "has_partnership",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );

    await queryRunner.addColumn(
      "sales",
      new TableColumn({
        name: "partnership_type",
        type: "enum",
        enum: ["PROPERTY", "CLIENT", "BOTH"],
        enumName: "sales_partnership_type_enum",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("sales", "partnership_type");
    await queryRunner.query('DROP TYPE IF EXISTS "sales_partnership_type_enum"');
    await queryRunner.dropColumn("sales", "has_partnership");
  }
}
