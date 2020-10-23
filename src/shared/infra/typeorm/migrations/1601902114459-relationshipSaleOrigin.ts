import {MigrationInterface, QueryRunner} from "typeorm";

export default class relationshipSaleOrigin1601902114459 implements MigrationInterface {
    name = 'relationshipSaleOrigin1601902114459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "originId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_b23b4b531cd4a83112128bb142f" FOREIGN KEY ("originId") REFERENCES "origin_sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_b23b4b531cd4a83112128bb142f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "originId"`);
    }

}
