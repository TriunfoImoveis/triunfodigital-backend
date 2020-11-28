import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTableCaptivators1606584882417 implements MigrationInterface {
    name = 'changeTableCaptivators1606584882417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "FK_7b6d3dadaaa209fbd7289f00388"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "FK_251b5a3c18862411c9e754fed03"`);
        await queryRunner.query(`DROP INDEX "IDX_251b5a3c18862411c9e754fed0"`);
        await queryRunner.query(`DROP INDEX "IDX_7b6d3dadaaa209fbd7289f0038"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "PK_0003ced74cc84cbc69f4afe943d"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "PK_7b6d3dadaaa209fbd7289f00388" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP COLUMN "salesId"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "PK_7b6d3dadaaa209fbd7289f00388"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD "sale_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "PK_ab910c49b60c9162d3f15780b5c" PRIMARY KEY ("sale_id")`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "PK_ab910c49b60c9162d3f15780b5c"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "PK_efd9e24cc94754eea1fa5453efa" PRIMARY KEY ("sale_id", "user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_ab910c49b60c9162d3f15780b5" ON "sale_has_captivators" ("sale_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a276ff8527d53ee6a1307e667c" ON "sale_has_captivators" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "FK_ab910c49b60c9162d3f15780b5c" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "FK_a276ff8527d53ee6a1307e667c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "FK_a276ff8527d53ee6a1307e667c1"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "FK_ab910c49b60c9162d3f15780b5c"`);
        await queryRunner.query(`DROP INDEX "IDX_a276ff8527d53ee6a1307e667c"`);
        await queryRunner.query(`DROP INDEX "IDX_ab910c49b60c9162d3f15780b5"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "PK_efd9e24cc94754eea1fa5453efa"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "PK_ab910c49b60c9162d3f15780b5c" PRIMARY KEY ("sale_id")`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "PK_ab910c49b60c9162d3f15780b5c"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP COLUMN "sale_id"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD "usersId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "PK_7b6d3dadaaa209fbd7289f00388" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD "salesId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" DROP CONSTRAINT "PK_7b6d3dadaaa209fbd7289f00388"`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "PK_0003ced74cc84cbc69f4afe943d" PRIMARY KEY ("salesId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7b6d3dadaaa209fbd7289f0038" ON "sale_has_captivators" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_251b5a3c18862411c9e754fed0" ON "sale_has_captivators" ("salesId") `);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "FK_251b5a3c18862411c9e754fed03" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_captivators" ADD CONSTRAINT "FK_7b6d3dadaaa209fbd7289f00388" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
