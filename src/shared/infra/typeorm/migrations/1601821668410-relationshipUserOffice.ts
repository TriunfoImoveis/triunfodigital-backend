import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipUserOffice1601821668410 implements MigrationInterface {
    name = 'relationshipUserOffice1601821668410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "office_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6b31546fc92b0d7344f032d0447" FOREIGN KEY ("office_id") REFERENCES "offices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6b31546fc92b0d7344f032d0447"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "office_id"`);
    }

}
