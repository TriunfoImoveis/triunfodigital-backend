import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableSaleHasCaptivators1603064731761 implements MigrationInterface {
    name = 'createTableSaleHasCaptivators1603064731761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_has_captivators" ("salesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0003ced74cc84cbc69f4afe943d" PRIMARY KEY ("salesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_251b5a3c18862411c9e754fed0" ON "sale_has_captivators" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b6d3dadaaa209fbd7289f0038" ON "sale_has_captivators" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "FK_251b5a3c18862411c9e754fed03" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "FK_7b6d3dadaaa209fbd7289f00388" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "FK_7b6d3dadaaa209fbd7289f00388"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "FK_251b5a3c18862411c9e754fed03"`);
        await queryRunner.query(`DROP INDEX "IDX_7b6d3dadaaa209fbd7289f0038"`);
        await queryRunner.query(`DROP INDEX "IDX_251b5a3c18862411c9e754fed0"`);
        await queryRunner.query(`DROP TABLE "sale_has_captivators"`);
    }

}
