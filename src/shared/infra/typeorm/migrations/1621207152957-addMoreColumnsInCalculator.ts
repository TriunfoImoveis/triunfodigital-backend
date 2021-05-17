import {MigrationInterface, QueryRunner} from "typeorm";

export class addMoreColumnsInCalculator1621207152957 implements MigrationInterface {
    name = 'addMoreColumnsInCalculator1621207152957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "tax_rate"`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "note_number" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "tax_rate_nf" numeric(4,2)`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "tax_iss_nf" numeric(4,2)`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "value_iss" numeric(14,2)`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "tax_collection" numeric(4,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "tax_collection"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "value_iss"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "tax_iss_nf"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "tax_rate_nf"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "note_number"`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "tax_rate" numeric(4,2)`);
    }

}
