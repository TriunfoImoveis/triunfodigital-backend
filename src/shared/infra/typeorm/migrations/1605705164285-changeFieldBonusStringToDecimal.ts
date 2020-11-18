import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldBonusStringToDecimal1605705164285 implements MigrationInterface {
    name = 'changeFieldBonusStringToDecimal1605705164285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "bonus"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "bonus" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "bonus"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "bonus" character varying(50)`);
    }

}
