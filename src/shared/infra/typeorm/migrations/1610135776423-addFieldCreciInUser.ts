import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldCreciInUser1610135776423 implements MigrationInterface {
    name = 'addFieldCreciInUser1610135776423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "creci" character varying(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "creci"`);
    }

}
