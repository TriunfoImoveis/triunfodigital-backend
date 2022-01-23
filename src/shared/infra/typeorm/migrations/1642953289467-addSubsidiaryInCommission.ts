import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubsidiaryInCommission1642953289467 implements MigrationInterface {
    name = 'addSubsidiaryInCommission1642953289467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comissions" ADD "subsidiary_id" uuid`);
        await queryRunner.query(`ALTER TABLE "comissions" ADD CONSTRAINT "FK_8c97815c7547c6bfdb2699bc7a0" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comissions" DROP CONSTRAINT "FK_8c97815c7547c6bfdb2699bc7a0"`);
        await queryRunner.query(`ALTER TABLE "comissions" DROP COLUMN "subsidiary_id"`);
    }

}
