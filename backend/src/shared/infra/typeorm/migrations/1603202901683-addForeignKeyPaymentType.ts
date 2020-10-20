import {MigrationInterface, QueryRunner} from "typeorm";

export class addForeignKeyPaymentType1603202901683 implements MigrationInterface {
    name = 'addForeignKeyPaymentType1603202901683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "payment_type" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_f537a645409cac51ece9a8627a5" FOREIGN KEY ("payment_type") REFERENCES "payment_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_f537a645409cac51ece9a8627a5"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "payment_type"`);
    }

}
