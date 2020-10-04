import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipSubsidiaryDepartament1601821373747 implements MigrationInterface {
    name = 'relationshipSubsidiaryDepartament1601821373747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departaments" ADD "subsidiary_id" uuid`);
        await queryRunner.query(`ALTER TABLE "departaments" ADD CONSTRAINT "FK_adabc82d9e8d077e12e6cc3bfc8" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departaments" DROP CONSTRAINT "FK_adabc82d9e8d077e12e6cc3bfc8"`);
        await queryRunner.query(`ALTER TABLE "departaments" DROP COLUMN "subsidiary_id"`);
    }

}
