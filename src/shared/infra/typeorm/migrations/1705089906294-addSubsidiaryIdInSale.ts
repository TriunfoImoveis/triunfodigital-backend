import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class addSubsidiaryIdInSale1705089906294 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "sales",
      new TableColumn({
        name: "subsidiary_id",
        type: "uuid",
        isNullable: true,
      }),
    )

    await queryRunner.createForeignKey(
      "sales",
      new TableForeignKey({
        columnNames: ["subsidiary_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "subsidiaries",
        onDelete: "NO ACTION",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("sales")
    const foreignKey = table && table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("subsidiary_id") !== -1,
    )
    if (foreignKey) {
      await queryRunner.dropForeignKey("sales", foreignKey)
      await queryRunner.dropColumn("sales", "questionId")
    }

  }

}
