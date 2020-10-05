import {MigrationInterface, QueryRunner} from "typeorm";

export class createDepartament1601821259343 implements MigrationInterface {
    name = 'createDepartament1601821259343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departaments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "initials" character varying(50) NOT NULL, "goal" numeric(14,2) NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4e2ca27f35e6aac0836a684321a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "departaments"`);
    }

}
