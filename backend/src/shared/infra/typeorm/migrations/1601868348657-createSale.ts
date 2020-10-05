import {MigrationInterface, QueryRunner} from "typeorm";

export class createSale1601868348657 implements MigrationInterface {
    name = 'createSale1601868348657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "sales_sale_type_enum" AS ENUM('Novo', 'Usado')`);
        await queryRunner.query(`CREATE TYPE "sales_status_enum" AS ENUM('Pendente', 'Confirmado')`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sale_type" "sales_sale_type_enum" NOT NULL, "sale_date" date NOT NULL, "realty_ammount" numeric(14,2) NOT NULL, "percentage_sale" integer NOT NULL, "percentage_company" integer NOT NULL, "commission" numeric(10,2) NOT NULL, "details_payment" character varying(150), "bonus" character varying(50), "observation" character varying(150), "status" "sales_status_enum" NOT NULL DEFAULT 'Pendente', CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TYPE "sales_status_enum"`);
        await queryRunner.query(`DROP TYPE "sales_sale_type_enum"`);
    }

}
