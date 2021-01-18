import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedFieldPercentageCompanyInSale1610991583193 implements MigrationInterface {
    name = 'updatedFieldPercentageCompanyInSale1610991583193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "percentage_company" TYPE numeric(4,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "percentage_company" TYPE numeric(3,1)`);
    }

}
