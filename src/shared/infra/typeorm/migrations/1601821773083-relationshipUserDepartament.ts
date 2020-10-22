import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipUserDepartament1601821773083 implements MigrationInterface {
    name = 'relationshipUserDepartament1601821773083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "departament_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f17e7ea3a53d4081f613885720a" FOREIGN KEY ("departament_id") REFERENCES "departaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f17e7ea3a53d4081f613885720a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "departament_id"`);
    }

}
