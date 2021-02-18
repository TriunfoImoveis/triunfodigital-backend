import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnValidatedAccountToUser1612498324104 implements MigrationInterface {
    name = 'addColumnValidatedAccountToUser1612498324104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "validated_account" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "validated_account"`);
    }

}
