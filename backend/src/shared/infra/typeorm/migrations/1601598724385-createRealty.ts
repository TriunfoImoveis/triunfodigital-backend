import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class createRealty1601598724385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      await queryRunner.createTable(
        new Table({
          name: 'realties',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: `uuid_generate_v4()`,
            },
            {
              name: 'enterprise',
              type: 'varchar(200)',
              isNullable: false,
            },
            {
              name: 'unit',
              type: 'varchar(80)',
              isNullable: false,
            },
            {
              name: 'state',
              type: 'varchar(2)',
              isNullable: false,
            },
            {
              name: 'city',
              type: 'varchar(100)',
              isNullable: false,
            },
            {
              name: 'neighborhood',
              type: 'varchar(80)',
              isNullable: false,
            },
            {
              name: 'property_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'active',
              type: 'boolean',
              isNullable: false,
              default: true,
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
        'realties',
        new TableForeignKey({
          name: 'PropertyType_Realties',
          columnNames: ['property_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'property_types',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('realties', 'PropertyType_Realties');
      await queryRunner.dropTable('realties');
    }

}
