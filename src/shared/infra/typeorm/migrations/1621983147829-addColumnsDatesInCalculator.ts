import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsDatesInCalculator1621983147829 implements MigrationInterface {
    name = 'addColumnsDatesInCalculator1621983147829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" ADD "pay_date" date`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "created_at" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "pay_date"`);
    }

}
