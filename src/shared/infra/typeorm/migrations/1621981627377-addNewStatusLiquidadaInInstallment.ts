import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewStatusLiquidadaInInstallment1621981627377 implements MigrationInterface {
    name = 'addNewStatusLiquidadaInInstallment1621981627377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."installments_status_enum" RENAME TO "installments_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "installments_status_enum" AS ENUM('PENDENTE', 'VENCIDO', 'PAGO', 'CAIU', 'LIQUIDADA')`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" TYPE "installments_status_enum" USING "status"::"text"::"installments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "installments_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "installments_status_enum_old" AS ENUM('PENDENTE', 'VENCIDO', 'PAGO', 'CAIU')`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" TYPE "installments_status_enum_old" USING "status"::"text"::"installments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "installments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "installments_status_enum_old" RENAME TO  "installments_status_enum"`);
    }

}
