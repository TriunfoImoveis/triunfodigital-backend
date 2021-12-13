import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnGroup1638234839787 implements MigrationInterface {
    name = 'addColumnGroup1638234839787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD "id_grupo" uuid`);
        await queryRunner.query(`ALTER TABLE "external_despesas" ADD CONSTRAINT "FK_f855baf3104e6d65fffef8d5a56" FOREIGN KEY ("id_grupo") REFERENCES "group_expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP CONSTRAINT "FK_f855baf3104e6d65fffef8d5a56"`);
        await queryRunner.query(`ALTER TABLE "external_despesas" DROP COLUMN "id_grupo"`);
    }

}
