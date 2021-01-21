import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsInSaleToSignals1611200316340 implements MigrationInterface {
    name = 'addColumnsInSaleToSignals1611200316340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "value_signal" numeric(14,2)`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "pay_date_signal" date`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "payment_signal" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "payment_signal"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "pay_date_signal"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "value_signal"`);
    }

}
