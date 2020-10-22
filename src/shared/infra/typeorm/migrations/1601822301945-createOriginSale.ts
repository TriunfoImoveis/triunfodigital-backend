import {MigrationInterface, QueryRunner} from "typeorm";

export class createOriginSale1601822301945 implements MigrationInterface {
    name = 'createOriginSale1601822301945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "origin_sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, CONSTRAINT "PK_27116036f4bb78f9e74dc82ce4a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "origin_sales"`);
    }

}
