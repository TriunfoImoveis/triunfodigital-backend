import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFieldSaleInInstallment1611196126211 implements MigrationInterface {
    name = 'updateFieldSaleInInstallment1611196126211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_abe14dbc67a18aef2f890504cd4"`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_abe14dbc67a18aef2f890504cd4" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_abe14dbc67a18aef2f890504cd4"`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_abe14dbc67a18aef2f890504cd4" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
