import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesModuleExternal1633916781523 implements MigrationInterface {
    name = 'EntitiesModuleExternal1633916781523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "external_contas_tipo_conta_enum" AS ENUM('CORRENTE', 'POUPANCA', 'SALARIO')`);
        await queryRunner.query(`CREATE TABLE "external_contas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome_banco" character varying(150) NOT NULL, "tipo_conta" "external_contas_tipo_conta_enum" NOT NULL, "agencia" character varying(10) NOT NULL, "conta" character varying(10) NOT NULL, CONSTRAINT "UQ_513862fa15c4a6aed0f3ca64fe8" UNIQUE ("conta"), CONSTRAINT "PK_bdf136a8d6d8287ea6c0b2c1578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "external_escritorios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(80) NOT NULL, CONSTRAINT "PK_c4eae2ddde8e2bed91b3ce9bcac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "external_despesas_tipo_despesa_enum" AS ENUM('ENTRADA', 'SAIDA')`);
        await queryRunner.query(`CREATE TABLE "external_despesas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo_despesa" "external_despesas_tipo_despesa_enum" NOT NULL, "descricao" character varying(255) NOT NULL, "valor" numeric(14,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_escritorio" uuid NOT NULL, "id_conta" uuid, CONSTRAINT "PK_caa566474452c09f99ffe6895ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_8e210d2c71b78eb3b64a6463031" FOREIGN KEY ("id_escritorio") REFERENCES "external_escritorios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_e310c2f70edf85f5d57ce26b361" FOREIGN KEY ("id_conta") REFERENCES "external_contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_e310c2f70edf85f5d57ce26b361"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_8e210d2c71b78eb3b64a6463031"`);
        await queryRunner.query(`DROP TABLE "external_despesas"`);
        await queryRunner.query(`DROP TYPE "external_despesas_tipo_despesa_enum"`);
        await queryRunner.query(`DROP TABLE "external_escritorios"`);
        await queryRunner.query(`DROP TABLE "external_contas"`);
        await queryRunner.query(`DROP TYPE "external_contas_tipo_conta_enum"`);
    }

}
