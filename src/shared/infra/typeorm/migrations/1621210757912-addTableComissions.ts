import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableComissions1621210757912 implements MigrationInterface {
    name = 'addTableComissions1621210757912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "comissions_participant_type_enum" AS ENUM('VENDEDOR', 'CAPTADOR', 'COORDENADOR', 'DIRETOR', 'EMPRESA')`);
        await queryRunner.query(`CREATE TABLE "comissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "participant_type" "comissions_participant_type_enum" NOT NULL, "comission_percentage" numeric(4,2) NOT NULL, "comission_integral" numeric(14,2) NOT NULL, "tax_percentage" numeric(4,2) NOT NULL, "tax_value" numeric(14,2) NOT NULL, "comission_liquid" numeric(14,2) NOT NULL, CONSTRAINT "PK_4f2c00558132b93f38bed593918" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comissions"`);
        await queryRunner.query(`DROP TYPE "comissions_participant_type_enum"`);
    }

}
