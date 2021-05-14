import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsNoteValueAndTaxRate1620789333839 implements MigrationInterface {
    name = 'addColumnsNoteValueAndTaxRate1620789333839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" ADD "note_value" numeric(14,2)`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "tax_rate" numeric(4,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "tax_rate"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "note_value"`);
    }

}
