import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedEntityBuilder1604542365053 implements MigrationInterface {
    name = 'updatedEntityBuilder1604542365053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "builders" ADD "state" character varying(2)`);
        await queryRunner.query(`ALTER TABLE "builders" ADD "city" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "builders" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "builders" DROP COLUMN "state"`);
    }

}
