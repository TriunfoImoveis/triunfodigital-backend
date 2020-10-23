import {MigrationInterface, QueryRunner} from "typeorm";

export class renamedSallerToSeller1602704413995 implements MigrationInterface {
    name = 'renamedSallerToSeller1602704413995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f"`);
        await queryRunner.query(`ALTER TABLE "sales" RENAME COLUMN "client_saller" TO "client_seller"`);
        await queryRunner.query(`CREATE TABLE "sale_has_sellers" ("salesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_8e98fda42d545c406faa1405d75" PRIMARY KEY ("salesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d74258dab6efef99a9bcbe6d45" ON "sale_has_sellers" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff480d5d77ba3bbd95a0677350" ON "sale_has_sellers" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_86b97699f61c5b2d4f2b0611c1b" FOREIGN KEY ("client_seller") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "FK_d74258dab6efef99a9bcbe6d45d" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "FK_ff480d5d77ba3bbd95a06773505" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "FK_ff480d5d77ba3bbd95a06773505"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "FK_d74258dab6efef99a9bcbe6d45d"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_86b97699f61c5b2d4f2b0611c1b"`);
        await queryRunner.query(`DROP INDEX "IDX_ff480d5d77ba3bbd95a0677350"`);
        await queryRunner.query(`DROP INDEX "IDX_d74258dab6efef99a9bcbe6d45"`);
        await queryRunner.query(`DROP TABLE "sale_has_sellers"`);
        await queryRunner.query(`ALTER TABLE "sales" RENAME COLUMN "client_seller" TO "client_saller"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f" FOREIGN KEY ("client_saller") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
