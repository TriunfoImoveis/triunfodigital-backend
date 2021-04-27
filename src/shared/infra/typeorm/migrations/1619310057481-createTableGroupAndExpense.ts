import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableGroupAndExpense1619310057481 implements MigrationInterface {
    name = 'createTableGroupAndExpense1619310057481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "expenses_expense_type_enum" AS ENUM('FIXA', 'VARIAVEL')`);
        await queryRunner.query(`CREATE TYPE "expenses_status_enum" AS ENUM('PENDENTE', 'VENCIDO', 'PAGO', 'CANCELADO')`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expense_type" "expenses_expense_type_enum" NOT NULL, "description" character varying(255) NOT NULL, "due_date" date NOT NULL, "value" numeric(14,2) NOT NULL, "pay_date" date, "value_paid" numeric(14,2), "status" "expenses_status_enum" NOT NULL DEFAULT 'PENDENTE', CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_expenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, CONSTRAINT "PK_5f758da134cc01c6a31cf3cd000" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "group_expenses"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TYPE "expenses_status_enum"`);
        await queryRunner.query(`DROP TYPE "expenses_expense_type_enum"`);
    }

}
