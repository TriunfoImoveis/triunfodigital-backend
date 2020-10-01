import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createPropertyType1601526096693 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      await queryRunner.createTable(
        new Table({
          name: 'property_types',
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
              type: 'varchar(150)',
              isNullable: false,
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('property_types');
    }

}
