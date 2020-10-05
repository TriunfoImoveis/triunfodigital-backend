import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipSaleRealty1601870561236 implements MigrationInterface {
    name = 'relationshipSaleRealty1601870561236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "realtyId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_a3a18933220821e2a7a0dedc2da" UNIQUE ("realtyId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_a3a18933220821e2a7a0dedc2da" FOREIGN KEY ("realtyId") REFERENCES "realties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_a3a18933220821e2a7a0dedc2da"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_a3a18933220821e2a7a0dedc2da"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "realtyId"`);
    }

}
