import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipCalculatorAndUserInComission1621211476035 implements MigrationInterface {
    name = 'relationshipCalculatorAndUserInComission1621211476035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comissions" ADD "calculation_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comissions" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "comissions" ADD CONSTRAINT "FK_d9ec7469c666d34f5bc926ec8a4" FOREIGN KEY ("calculation_id") REFERENCES "calculations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comissions" ADD CONSTRAINT "FK_fe356a7c25b9a47502561034513" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comissions" DROP CONSTRAINT "FK_fe356a7c25b9a47502561034513"`);
        await queryRunner.query(`ALTER TABLE "comissions" DROP CONSTRAINT "FK_d9ec7469c666d34f5bc926ec8a4"`);
        await queryRunner.query(`ALTER TABLE "comissions" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comissions" DROP COLUMN "calculation_id"`);
    }

}
