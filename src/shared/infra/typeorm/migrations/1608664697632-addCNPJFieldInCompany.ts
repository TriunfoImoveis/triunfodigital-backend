import {MigrationInterface, QueryRunner} from "typeorm";

export class addCNPJFieldInCompany1608664697632 implements MigrationInterface {
    name = 'addCNPJFieldInCompany1608664697632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "cnpj" character varying(14)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "cnpj"`);
    }

}
