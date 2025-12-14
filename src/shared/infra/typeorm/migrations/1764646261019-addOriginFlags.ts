import { MigrationInterface, QueryRunner } from "typeorm";

export class addOriginFlags1764646261019 implements MigrationInterface {
    name = 'addOriginFlags1764646261019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "origin_sales" ADD "isOriginClient" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "origin_sales" ADD "isOriginChannel" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "origin_sales" DROP COLUMN "isOriginChannel"`);
        await queryRunner.query(`ALTER TABLE "origin_sales" DROP COLUMN "isOriginClient"`);
    }

}
