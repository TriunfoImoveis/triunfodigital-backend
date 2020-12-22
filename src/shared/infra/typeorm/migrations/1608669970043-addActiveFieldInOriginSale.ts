import {MigrationInterface, QueryRunner} from "typeorm";

export class addActiveFieldInOriginSale1608669970043 implements MigrationInterface {
    name = 'addActiveFieldInOriginSale1608669970043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "origin_sales" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "origin_sales" DROP COLUMN "active"`);
    }

}
