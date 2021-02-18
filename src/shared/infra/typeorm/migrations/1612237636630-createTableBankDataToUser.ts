import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableBankDataToUser1612237636630 implements MigrationInterface {
    name = 'createTableBankDataToUser1612237636630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "bank_data_account_type_enum" AS ENUM('CORRENTE', 'POUPANCA', 'SALARIO')`);
        await queryRunner.query(`CREATE TABLE "bank_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bank_name" character varying(200) NOT NULL, "account_type" "bank_data_account_type_enum" NOT NULL, "agency" character varying(10) NOT NULL, "account" character varying(10) NOT NULL, CONSTRAINT "PK_4d353142a69ee41d42e6b8c8c8a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bank_data"`);
        await queryRunner.query(`DROP TYPE "bank_data_account_type_enum"`);
    }

}
