import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteFieldPercentageInTableCompany1610996701180 implements MigrationInterface {
    name = 'deleteFieldPercentageInTableCompany1610996701180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "percentage"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "percentage" numeric(3,1) NOT NULL`);
    }

}
