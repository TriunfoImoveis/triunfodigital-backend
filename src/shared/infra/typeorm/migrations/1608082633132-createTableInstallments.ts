import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableInstallments1608082633132 implements MigrationInterface {
    name = 'createTableInstallments1608082633132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "installments_status_enum" AS ENUM('PENDENTE', 'VENCIDO', 'PAGO')`);
        await queryRunner.query(`CREATE TABLE "installments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "installment_number" integer NOT NULL, "value" numeric(14,2) NOT NULL, "due_date" date NOT NULL, "status" "installments_status_enum" NOT NULL DEFAULT 'PENDENTE', "amount_paid" numeric(14,2), "pay_date" date, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "installments"`);
        await queryRunner.query(`DROP TYPE "installments_status_enum"`);
    }

}
