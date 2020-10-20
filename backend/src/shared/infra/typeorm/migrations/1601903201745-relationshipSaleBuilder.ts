import {MigrationInterface, QueryRunner} from "typeorm";

export default class relationshipSaleBuilder1601903201745 implements MigrationInterface {
    name = 'relationshipSaleBuilder1601903201745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "builderId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_cb376a34d6c3f751df5ccbb244d" FOREIGN KEY ("builderId") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_cb376a34d6c3f751df5ccbb244d"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "builderId"`);
    }

}
