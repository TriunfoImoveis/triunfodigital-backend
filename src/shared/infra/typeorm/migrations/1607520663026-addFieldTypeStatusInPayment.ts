import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldTypeStatusInPayment1607520663026 implements MigrationInterface {
    name = 'addFieldTypeStatusInPayment1607520663026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "payment_types_status_enum" AS ENUM('TOTAL', 'PARCELADO')`);
        await queryRunner.query(`ALTER TABLE "payment_types" ADD "status" "payment_types_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_types" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "payment_types_status_enum"`);
    }

}
