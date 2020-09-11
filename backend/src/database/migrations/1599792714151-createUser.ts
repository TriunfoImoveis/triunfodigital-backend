import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createUser1599792714151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      await queryRunner.createTable(
        new Table({
          name: 'users',
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
              type: 'varchar(100)',
            },
            {
              name: 'email',
              type: 'varchar(150)',
            },
            {
              name: 'password',
              type: 'varchar(150)',
            },
            {
              name: 'phone',
              type: 'varchar(11)',
            },
            {
              name: 'admissionDate',
              type: 'date',
            },
            {
              name: 'goal',
              type: 'decimal(14,2)',
              isNullable: true
            },
            {
              name: 'active',
              type: 'boolean',
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
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
