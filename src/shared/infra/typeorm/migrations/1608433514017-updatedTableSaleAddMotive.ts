import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedTableSaleAddMotive1608433514017 implements MigrationInterface {
    name = 'updatedTableSaleAddMotive1608433514017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "another_motive" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "motive_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_6573ccad70f73087a3c28cb5799" FOREIGN KEY ("motive_id") REFERENCES "motives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_6573ccad70f73087a3c28cb5799"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "motive_id"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "another_motive"`);
    }

}
