import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipDevisionToDivisionType1620681275219 implements MigrationInterface {
    name = 'addRelationshipDevisionToDivisionType1620681275219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "divisions" ADD "division_type" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "divisions" ADD CONSTRAINT "FK_e7165a0d77debb3dfeb9ea96d89" FOREIGN KEY ("division_type") REFERENCES "division_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "divisions" DROP CONSTRAINT "FK_e7165a0d77debb3dfeb9ea96d89"`);
        await queryRunner.query(`ALTER TABLE "divisions" DROP COLUMN "division_type"`);
    }

}
