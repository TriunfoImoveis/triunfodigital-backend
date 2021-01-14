import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldPercentageSale1610649764676 implements MigrationInterface {
    name = 'changeFieldPercentageSale1610649764676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "percentage_sale"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "percentage_sale" numeric(4,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "percentage_sale"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "percentage_sale" integer NOT NULL`);
    }

}
