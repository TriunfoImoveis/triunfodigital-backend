import {MigrationInterface, QueryRunner} from "typeorm";

export class createPropertyType1601822381888 implements MigrationInterface {
    name = 'createPropertyType1601822381888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, CONSTRAINT "PK_129390b286b9c776438dfa475a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "property_types"`);
    }

}
