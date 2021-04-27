import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipInExpense1619321272378 implements MigrationInterface {
    name = 'addRelationshipInExpense1619321272378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ADD "group_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "subsidiary_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "bank_data_id" uuid`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_d4e9271763ee685f5d746a4e550" FOREIGN KEY ("group_id") REFERENCES "group_expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_314916ebd4e651115fe1ac45a1c" FOREIGN KEY ("subsidiary_id") REFERENCES "subsidiaries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_eef31ec6f1b8d5d58c23abb85ed" FOREIGN KEY ("bank_data_id") REFERENCES "bank_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_49a0ca239d34e74fdc4e0625a78" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_49a0ca239d34e74fdc4e0625a78"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_eef31ec6f1b8d5d58c23abb85ed"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_314916ebd4e651115fe1ac45a1c"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_d4e9271763ee685f5d746a4e550"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "bank_data_id"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "subsidiary_id"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "group_id"`);
    }

}
