import {MigrationInterface, QueryRunner} from "typeorm";

export default class relationshipSaleClients1601926897307 implements MigrationInterface {
    name = 'relationshipSaleClients1601926897307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "clientBuyerId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_9f09156c21bc0f72cb6b8c119e7" UNIQUE ("clientBuyerId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "clientSallerId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_99993b396cc1956ce813b31e26c" UNIQUE ("clientSallerId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_9f09156c21bc0f72cb6b8c119e7" FOREIGN KEY ("clientBuyerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_99993b396cc1956ce813b31e26c" FOREIGN KEY ("clientSallerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_99993b396cc1956ce813b31e26c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_9f09156c21bc0f72cb6b8c119e7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_99993b396cc1956ce813b31e26c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "clientSallerId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_9f09156c21bc0f72cb6b8c119e7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "clientBuyerId"`);
    }

}
