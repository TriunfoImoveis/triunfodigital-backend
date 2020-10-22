import {MigrationInterface, QueryRunner} from "typeorm";

export class createBuilder1601822072974 implements MigrationInterface {
    name = 'createBuilder1601822072974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "builders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "cnpj" character varying(14) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "responsible" character varying(150) NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2c8deb3f62d3a5a1d82821f56cf" UNIQUE ("cnpj"), CONSTRAINT "PK_2dcfc79bccef3a91425b6cbb8b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "builders"`);
    }

}
