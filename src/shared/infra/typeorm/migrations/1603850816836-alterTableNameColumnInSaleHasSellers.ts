import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableNameColumnInSaleHasSellers1603850816836 implements MigrationInterface {
    name = 'alterTableNameColumnInSaleHasSellers1603850816836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "FK_d74258dab6efef99a9bcbe6d45d"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "FK_ff480d5d77ba3bbd95a06773505"`);
        await queryRunner.query(`DROP INDEX "IDX_d74258dab6efef99a9bcbe6d45"`);
        await queryRunner.query(`DROP INDEX "IDX_ff480d5d77ba3bbd95a0677350"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "PK_8e98fda42d545c406faa1405d75"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "PK_ff480d5d77ba3bbd95a06773505" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP COLUMN "salesId"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "PK_ff480d5d77ba3bbd95a06773505"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD "sale_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "PK_5c990032adfb6a6d58d5d17ca4c" PRIMARY KEY ("sale_id")`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "PK_5c990032adfb6a6d58d5d17ca4c"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "PK_8739ddbb1863afe19b382258021" PRIMARY KEY ("sale_id", "user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_5c990032adfb6a6d58d5d17ca4" ON "sale_has_sellers" ("sale_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ff8b5bac135935a8a2004593a" ON "sale_has_sellers" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "FK_5c990032adfb6a6d58d5d17ca4c" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "FK_4ff8b5bac135935a8a2004593a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "FK_4ff8b5bac135935a8a2004593a1"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "FK_5c990032adfb6a6d58d5d17ca4c"`);
        await queryRunner.query(`DROP INDEX "IDX_4ff8b5bac135935a8a2004593a"`);
        await queryRunner.query(`DROP INDEX "IDX_5c990032adfb6a6d58d5d17ca4"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "PK_8739ddbb1863afe19b382258021"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "PK_5c990032adfb6a6d58d5d17ca4c" PRIMARY KEY ("sale_id")`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "PK_5c990032adfb6a6d58d5d17ca4c"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP COLUMN "sale_id"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD "usersId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "PK_ff480d5d77ba3bbd95a06773505" PRIMARY KEY ("usersId")`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD "salesId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" DROP CONSTRAINT "PK_ff480d5d77ba3bbd95a06773505"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "PK_8e98fda42d545c406faa1405d75" PRIMARY KEY ("salesId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_ff480d5d77ba3bbd95a0677350" ON "sale_has_sellers" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d74258dab6efef99a9bcbe6d45" ON "sale_has_sellers" ("salesId") `);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "FK_ff480d5d77ba3bbd95a06773505" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sellers" ADD CONSTRAINT "FK_d74258dab6efef99a9bcbe6d45d" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
