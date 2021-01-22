import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipTokensToUser1611347514791 implements MigrationInterface {
    name = 'relationshipTokensToUser1611347514791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_9e144a67be49e5bba91195ef5de" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_9e144a67be49e5bba91195ef5de"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "user_id" character varying NOT NULL`);
    }

}
