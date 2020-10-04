import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1601821576950 implements MigrationInterface {
    name = 'createUser1601821576950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "avatar" character varying NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "admission_date" date NOT NULL, "goal" numeric(10,2) NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
