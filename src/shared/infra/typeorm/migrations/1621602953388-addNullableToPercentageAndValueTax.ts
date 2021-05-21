import {MigrationInterface, QueryRunner} from "typeorm";

export class addNullableToPercentageAndValueTax1621602953388 implements MigrationInterface {
    name = 'addNullableToPercentageAndValueTax1621602953388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comissions" ALTER COLUMN "tax_percentage" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comissions" ALTER COLUMN "tax_value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comissions" ALTER COLUMN "tax_value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comissions" ALTER COLUMN "tax_percentage" SET NOT NULL`);
    }

}
