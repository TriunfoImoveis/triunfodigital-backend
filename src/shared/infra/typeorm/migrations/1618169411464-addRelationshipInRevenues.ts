import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipInRevenues1618169411464 implements MigrationInterface {
    name = 'addRelationshipInRevenues1618169411464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revenues" ADD "subsidiary_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "revenues" ADD "bank_data_id" uuid`);
        await queryRunner.query(`ALTER TABLE "revenues" ADD CONSTRAINT "FK_1ba0e2438e1cebd7d15f21f11f0" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "revenues" ADD CONSTRAINT "FK_bf3684df5ea641134665d8012e7" FOREIGN KEY ("bank_data_id") REFERENCES "bank_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revenues" DROP CONSTRAINT "FK_bf3684df5ea641134665d8012e7"`);
        await queryRunner.query(`ALTER TABLE "revenues" DROP CONSTRAINT "FK_1ba0e2438e1cebd7d15f21f11f0"`);
        await queryRunner.query(`ALTER TABLE "revenues" DROP COLUMN "bank_data_id"`);
        await queryRunner.query(`ALTER TABLE "revenues" DROP COLUMN "subsidiary_id"`);
    }

}
