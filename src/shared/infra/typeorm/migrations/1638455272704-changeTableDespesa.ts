import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTableDespesa1638455272704 implements MigrationInterface {
    name = 'changeTableDespesa1638455272704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_8e210d2c71b78eb3b64a6463031"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_e310c2f70edf85f5d57ce26b361"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD "data_pagamento" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_8e210d2c71b78eb3b64a6463031" FOREIGN KEY ("id_escritorio") REFERENCES "subsidiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_e310c2f70edf85f5d57ce26b361" FOREIGN KEY ("id_conta") REFERENCES "bank_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_e310c2f70edf85f5d57ce26b361"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_8e210d2c71b78eb3b64a6463031"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP COLUMN "data_pagamento"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_e310c2f70edf85f5d57ce26b361" FOREIGN KEY ("id_conta") REFERENCES "external_contas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_8e210d2c71b78eb3b64a6463031" FOREIGN KEY ("id_escritorio") REFERENCES "external_escritorios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
