import {MigrationInterface, QueryRunner} from "typeorm";

export class addBankDataInCalculator1621725405981 implements MigrationInterface {
    name = 'addBankDataInCalculator1621725405981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" ADD "bank_data_id" uuid`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_65fc66a585d6084ac12a46bfa6f" FOREIGN KEY ("bank_data_id") REFERENCES "bank_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_65fc66a585d6084ac12a46bfa6f"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "bank_data_id"`);
    }

}
