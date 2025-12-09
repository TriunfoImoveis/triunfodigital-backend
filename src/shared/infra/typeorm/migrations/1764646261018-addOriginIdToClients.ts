import { MigrationInterface, QueryRunner } from "typeorm";

export class addOriginIdToClients1764646261018 implements MigrationInterface {
    name = 'addOriginIdToClients1764646261018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "origin_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_clients_origin" FOREIGN KEY ("origin_id") REFERENCES "origin_sales"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_clients_origin"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "origin_id"`);
    }

}
