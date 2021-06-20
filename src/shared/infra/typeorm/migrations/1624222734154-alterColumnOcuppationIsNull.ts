import {MigrationInterface, QueryRunner} from "typeorm";

export class alterColumnOcuppationIsNull1624222734154 implements MigrationInterface {
    name = 'alterColumnOcuppationIsNull1624222734154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "occupation" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "occupation" SET NOT NULL`);
    }

}
