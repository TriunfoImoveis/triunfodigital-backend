import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldPercentageInCompany1608044980994 implements MigrationInterface {
    name = 'changeFieldPercentageInCompany1608044980994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "percentage"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "percentage" numeric(3,1) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "percentage"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "percentage" integer NOT NULL`);
    }

}
