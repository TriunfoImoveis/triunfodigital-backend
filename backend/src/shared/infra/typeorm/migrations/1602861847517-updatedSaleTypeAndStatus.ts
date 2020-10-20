import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedSaleTypeAndStatus1602861847517 implements MigrationInterface {
    name = 'updatedSaleTypeAndStatus1602861847517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."sales_sale_type_enum" RENAME TO "sales_sale_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "sales_sale_type_enum" AS ENUM('NOVO', 'USADO')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "sale_type" TYPE "sales_sale_type_enum" USING "sale_type"::"text"::"sales_sale_type_enum"`);
        await queryRunner.query(`DROP TYPE "sales_sale_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."sales_status_enum" RENAME TO "sales_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "sales_status_enum" AS ENUM('PENDENTE', 'CAIU', 'EM PARTE', 'PAGO TOTAL')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" TYPE "sales_status_enum" USING "status"::"text"::"sales_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "sales_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'Pendente'`);
        await queryRunner.query(`CREATE TYPE "sales_status_enum_old" AS ENUM('Pendente', 'Confirmado')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" TYPE "sales_status_enum_old" USING "status"::"text"::"sales_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "sales_status_enum"`);
        await queryRunner.query(`ALTER TYPE "sales_status_enum_old" RENAME TO  "sales_status_enum"`);
        await queryRunner.query(`CREATE TYPE "sales_sale_type_enum_old" AS ENUM('Novo', 'Usado')`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "sale_type" TYPE "sales_sale_type_enum_old" USING "sale_type"::"text"::"sales_sale_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "sales_sale_type_enum"`);
        await queryRunner.query(`ALTER TYPE "sales_sale_type_enum_old" RENAME TO  "sales_sale_type_enum"`);
    }

}
