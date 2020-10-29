import {MigrationInterface, QueryRunner} from "typeorm";

export class addExtraFieldsToSubsidiary1603744434981 implements MigrationInterface {
    name = 'addExtraFieldsToSubsidiary1603744434981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsidiaries" ADD "city" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "subsidiaries" ADD "state" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "subsidiaries" ADD "country" character varying(150)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsidiaries" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "subsidiaries" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "subsidiaries" DROP COLUMN "city"`);
    }

}
