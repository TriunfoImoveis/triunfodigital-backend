import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldAvatarToNullable1603945394780 implements MigrationInterface {
    name = 'addFieldAvatarToNullable1603945394780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`);
    }

}
