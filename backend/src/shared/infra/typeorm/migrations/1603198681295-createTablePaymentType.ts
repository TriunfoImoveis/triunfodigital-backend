import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablePaymentType1603198681295 implements MigrationInterface {
    name = 'createTablePaymentType1603198681295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "payment_types_type_enum" AS ENUM('NOVO', 'USADO')`);
        await queryRunner.query(`CREATE TABLE "payment_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "payment_types_type_enum" NOT NULL, "name" character varying(150) NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_4f84450f9fd8116e201d806c74b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment_types"`);
        await queryRunner.query(`DROP TYPE "payment_types_type_enum"`);
    }

}
