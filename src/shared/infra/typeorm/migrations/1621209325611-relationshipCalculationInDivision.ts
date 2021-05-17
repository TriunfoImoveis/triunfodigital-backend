import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipCalculationInDivision1621209325611 implements MigrationInterface {
    name = 'relationshipCalculationInDivision1621209325611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "divisions" ADD "calculation_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "divisions" ADD CONSTRAINT "FK_5af6a2ff768b7e86f39a40621ab" FOREIGN KEY ("calculation_id") REFERENCES "calculations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "divisions" DROP CONSTRAINT "FK_5af6a2ff768b7e86f39a40621ab"`);
        await queryRunner.query(`ALTER TABLE "divisions" DROP COLUMN "calculation_id"`);
    }

}
