import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableRevenuesInFinances1618169215795 implements MigrationInterface {
    name = 'createTableRevenuesInFinances1618169215795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "revenues_revenue_type_enum" AS ENUM('CREDITO', 'DESPACHANTE')`);
        await queryRunner.query(`CREATE TYPE "revenues_status_enum" AS ENUM('PENDENTE', 'VENCIDO', 'PAGO', 'CANCELADO')`);
        await queryRunner.query(`CREATE TABLE "revenues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "revenue_type" "revenues_revenue_type_enum" NOT NULL, "description" character varying(255) NOT NULL, "due_date" date NOT NULL, "value_integral" numeric(14,2) NOT NULL, "tax_rate" numeric(4,2) NOT NULL, "invoice_value" numeric(10,2), "status" "revenues_status_enum" NOT NULL DEFAULT 'PENDENTE', "client" character varying(150) NOT NULL, "pay_date" date, CONSTRAINT "PK_6e25eff5dd513bda2556a3d9370" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "revenues"`);
        await queryRunner.query(`DROP TYPE "revenues_status_enum"`);
        await queryRunner.query(`DROP TYPE "revenues_revenue_type_enum"`);
    }

}
