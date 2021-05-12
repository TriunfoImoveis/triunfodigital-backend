import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesDivisionTypeAndDivision1620680431744 implements MigrationInterface {
    name = 'createTablesDivisionTypeAndDivision1620680431744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "divisions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "percentage" numeric(4,2) NOT NULL, "value" numeric(14,2) NOT NULL, CONSTRAINT "PK_c1f864477b3fd0954564108ed96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "division_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, CONSTRAINT "PK_f85db77bfd7d3499df42ad8a1c4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "division_types"`);
        await queryRunner.query(`DROP TABLE "divisions"`);
    }

}
