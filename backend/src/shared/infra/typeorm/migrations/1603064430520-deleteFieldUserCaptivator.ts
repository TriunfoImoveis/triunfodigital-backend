import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteFieldUserCaptivator1603064430520 implements MigrationInterface {
    name = 'deleteFieldUserCaptivator1603064430520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "user_captivator"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "user_captivator" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c" FOREIGN KEY ("user_captivator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
