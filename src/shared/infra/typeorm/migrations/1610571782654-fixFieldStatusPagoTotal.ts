import {MigrationInterface, QueryRunner} from "typeorm";

export class fixFieldStatusPagoTotal1610571782654 implements MigrationInterface {
    name = 'fixFieldStatusPagoTotal1610571782654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."sales_status_enum" RENAME TO "sales_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "sales_status_enum" AS ENUM('NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO_TOTAL')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" TYPE "sales_status_enum" USING "status"::"text"::"sales_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'NAO_VALIDADO'`);
        await queryRunner.query(`DROP TYPE "sales_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "sales_status_enum_old" AS ENUM('NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO TOTAL')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" TYPE "sales_status_enum_old" USING "status"::"text"::"sales_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'NAO_VALIDADO'`);
        await queryRunner.query(`DROP TYPE "sales_status_enum"`);
        await queryRunner.query(`ALTER TYPE "sales_status_enum_old" RENAME TO  "sales_status_enum"`);
    }

}
