import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldPercentageInSale1608081284109 implements MigrationInterface {
    name = 'changeFieldPercentageInSale1608081284109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "percentage_company"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "percentage_company" numeric(3,1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "percentage_company"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "percentage_company" integer`);
    }

}
