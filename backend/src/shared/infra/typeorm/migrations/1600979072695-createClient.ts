import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class createClient1600979072695 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'clients',
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
            type: 'varchar(80)',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar(11)',
            isNullable: false,
          },
          {
            name: 'date_birth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(150)',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar(11)',
            isNullable: false,
          },
          {
            name: 'occupation',
            type: 'varchar(150)',
            isNullable: false,
          },
          {
            name: 'civil_status',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'number_children',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'varchar(50)',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }

}
