import {MigrationInterface, QueryRunner} from "typeorm";

export class createClient1601821904090 implements MigrationInterface {
    name = 'createClient1601821904090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "clients_civil_status_enum" AS ENUM('Casado(a)', 'Divorciado(a)', 'Solteiro(a)', 'Viúvo(a)')`);
        await queryRunner.query(`CREATE TYPE "clients_gender_enum" AS ENUM('Feminino', 'Masculino')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "cpf" character varying(11) NOT NULL, "date_birth" date NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "occupation" character varying(150) NOT NULL, "civil_status" "clients_civil_status_enum" NOT NULL, "number_children" integer NOT NULL, "gender" "clients_gender_enum" NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE ("cpf"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "clients_gender_enum"`);
        await queryRunner.query(`DROP TYPE "clients_civil_status_enum"`);
    }

}
