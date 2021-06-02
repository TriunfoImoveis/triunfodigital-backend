import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyRevenueAddColumnsNull1622604954342 implements MigrationInterface {
    name = 'modifyRevenueAddColumnsNull1622604954342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "tax_rate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "client" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "client" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revenues" ALTER COLUMN "tax_rate" SET NOT NULL`);
    }

}
