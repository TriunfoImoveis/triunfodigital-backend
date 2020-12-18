import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipInstallmentsToSale1608083914909 implements MigrationInterface {
    name = 'relationshipInstallmentsToSale1608083914909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" ADD "sale_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_abe14dbc67a18aef2f890504cd4" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_abe14dbc67a18aef2f890504cd4"`);
        await queryRunner.query(`ALTER TABLE "installments" DROP COLUMN "sale_id"`);
    }

}
