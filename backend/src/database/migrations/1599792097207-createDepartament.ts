import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class createDepartament1599792097207
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'departaments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar(45)',
          },
          {
            name: 'initials',
            type: 'varchar(8)',
            isNullable: true,
          },
          {
            name: 'goal',
            type: 'decimal(14,2)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'subsidiary_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'departaments',
      new TableForeignKey({
        name: 'SubsidiaryDepartaments',
        columnNames: ['subsidiary_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'subsidiaries',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('departaments', 'SubsidiaryDepartaments');
    await queryRunner.dropTable('departaments');
  }
}
