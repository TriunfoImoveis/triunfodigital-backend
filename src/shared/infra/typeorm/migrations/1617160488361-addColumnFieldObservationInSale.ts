import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnFieldObservationInSale1617160488361 implements MigrationInterface {
    name = 'addColumnFieldObservationInSale1617160488361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "observation" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "observation"`);
    }

}
