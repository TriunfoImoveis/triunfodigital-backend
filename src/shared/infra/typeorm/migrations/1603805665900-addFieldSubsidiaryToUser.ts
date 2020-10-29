import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldSubsidiaryToUser1603805665900 implements MigrationInterface {
    name = 'addFieldSubsidiaryToUser1603805665900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "subsidiary_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_db5e06f529d645e799de313dfdf" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_db5e06f529d645e799de313dfdf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subsidiary_id"`);
    }

}
