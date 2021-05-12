import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnBalance1620795530862 implements MigrationInterface {
    name = 'addColumnBalance1620795530862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" ADD "balance" numeric(14,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "balance"`);
    }

}
