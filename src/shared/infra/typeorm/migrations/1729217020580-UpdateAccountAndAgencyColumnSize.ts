import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAccountAndAgencyColumnSize1729217020580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        ALTER TABLE bank_data
        ALTER COLUMN account TYPE varchar(200);
      `);

      await queryRunner.query(`
        ALTER TABLE bank_data
        ALTER COLUMN agency TYPE varchar(200);
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        ALTER TABLE bank_data
        ALTER COLUMN account TYPE varchar(10);
      `);

      await queryRunner.query(`
        ALTER TABLE bank_data
        ALTER COLUMN agency TYPE varchar(10);
      `);
    }

}
