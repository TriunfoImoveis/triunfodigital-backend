import {MigrationInterface, QueryRunner, TableColumn, TableIndex} from "typeorm";

export class AddNormalizedNameToProfessions1762658622730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.addColumn('professions', new TableColumn({
      name: 'normalized_name',
      type: 'varchar',
      isNullable: false,
      default: "''",
    }));

    await queryRunner.createIndex('professions', new TableIndex({
      name: 'IDX_PROFESSIONS_NORMALIZED_NAME',
      columnNames: ['normalized_name'],
      isUnique: true,
    }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex('professions', 'IDX_PROFESSIONS_NORMALIZED_NAME');
      await queryRunner.dropColumn('professions', 'normalized_name');
    }
}
