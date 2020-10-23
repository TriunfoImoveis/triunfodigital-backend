import {MigrationInterface, QueryRunner} from "typeorm";

export default class addNullableAndNameToFieldsSale1601927962818 implements MigrationInterface {
    name = 'addNullableAndNameToFieldsSale1601927962818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_a3a18933220821e2a7a0dedc2da"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_b23b4b531cd4a83112128bb142f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_cb376a34d6c3f751df5ccbb244d"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_9f09156c21bc0f72cb6b8c119e7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_99993b396cc1956ce813b31e26c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_a3a18933220821e2a7a0dedc2da"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "realtyId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "originId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "builderId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_9f09156c21bc0f72cb6b8c119e7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "clientBuyerId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_99993b396cc1956ce813b31e26c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "clientSallerId"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "origin_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "realty_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_e6fe810c47ebdcd3c7124bed94e" UNIQUE ("realty_id")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "builder_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "client_buyer" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_3487bb8867c7fbd3616e08c5fe7" UNIQUE ("client_buyer")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "client_saller" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_67b723fb4b5f1a93f396adb409f" UNIQUE ("client_saller")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_422d1b2f8c5b8f23a5dfd0632cf" FOREIGN KEY ("origin_id") REFERENCES "origin_sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_e6fe810c47ebdcd3c7124bed94e" FOREIGN KEY ("realty_id") REFERENCES "realties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_42af7d66c591d9015ec017006fc" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3487bb8867c7fbd3616e08c5fe7" FOREIGN KEY ("client_buyer") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f" FOREIGN KEY ("client_saller") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3487bb8867c7fbd3616e08c5fe7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_42af7d66c591d9015ec017006fc"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_e6fe810c47ebdcd3c7124bed94e"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_422d1b2f8c5b8f23a5dfd0632cf"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_67b723fb4b5f1a93f396adb409f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "client_saller"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_3487bb8867c7fbd3616e08c5fe7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "client_buyer"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "builder_id"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_e6fe810c47ebdcd3c7124bed94e"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "realty_id"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "origin_id"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "clientSallerId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_99993b396cc1956ce813b31e26c" UNIQUE ("clientSallerId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "clientBuyerId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_9f09156c21bc0f72cb6b8c119e7" UNIQUE ("clientBuyerId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "builderId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "originId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "realtyId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_a3a18933220821e2a7a0dedc2da" UNIQUE ("realtyId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_99993b396cc1956ce813b31e26c" FOREIGN KEY ("clientSallerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_9f09156c21bc0f72cb6b8c119e7" FOREIGN KEY ("clientBuyerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_cb376a34d6c3f751df5ccbb244d" FOREIGN KEY ("builderId") REFERENCES "builders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_b23b4b531cd4a83112128bb142f" FOREIGN KEY ("originId") REFERENCES "origin_sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_a3a18933220821e2a7a0dedc2da" FOREIGN KEY ("realtyId") REFERENCES "realties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
