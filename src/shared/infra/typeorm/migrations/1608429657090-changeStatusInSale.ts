import {MigrationInterface, QueryRunner} from "typeorm";

export class changeStatusInSale1608429657090 implements MigrationInterface {
    name = 'changeStatusInSale1608429657090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."sales_status_enum" RENAME TO "sales_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "sales_status_enum" AS ENUM('NAO_VALIDADO', 'CAIU', 'PENDENTE', 'PAGO TOTAL')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" TYPE "sales_status_enum" USING "status"::"text"::"sales_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'NAO_VALIDADO'`);
        await queryRunner.query(`DROP TYPE "sales_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'NAO_VALIDADO'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`CREATE TYPE "sales_status_enum_old" AS ENUM('PENDENTE', 'CAIU', 'EM PARTE', 'PAGO TOTAL')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" TYPE "sales_status_enum_old" USING "status"::"text"::"sales_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'NAO_VALIDADO'`);
        await queryRunner.query(`DROP TYPE "sales_status_enum"`);
        await queryRunner.query(`ALTER TYPE "sales_status_enum_old" RENAME TO  "sales_status_enum"`);
    }

}
