import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipSaleToUser1601996962001 implements MigrationInterface {
    name = 'relationshipSaleToUser1601996962001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_has_sallers" ("salesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_dc3c3c0e24fcc1d88687fa7f7f1" PRIMARY KEY ("salesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e35b0c2a624660f1808e7495f" ON "sale_has_sallers" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c977fa7c5c9c8edc243ad0c91a" ON "sale_has_sallers" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "sales" ADD "user_captivator" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_00c098c0882df5d5ed7d03f1e0c" UNIQUE ("user_captivator")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "user_director" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_200e5680ecc99e721203df1344c" UNIQUE ("user_director")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "user_coordinator" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_1448e2ebb4544661fea925acaeb" UNIQUE ("user_coordinator")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c" FOREIGN KEY ("user_captivator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_200e5680ecc99e721203df1344c" FOREIGN KEY ("user_director") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_1448e2ebb4544661fea925acaeb" FOREIGN KEY ("user_coordinator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" ADD CONSTRAINT "FK_4e35b0c2a624660f1808e7495f2" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" ADD CONSTRAINT "FK_c977fa7c5c9c8edc243ad0c91a2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" DROP CONSTRAINT "FK_c977fa7c5c9c8edc243ad0c91a2"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" DROP CONSTRAINT "FK_4e35b0c2a624660f1808e7495f2"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_1448e2ebb4544661fea925acaeb"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_200e5680ecc99e721203df1344c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_1448e2ebb4544661fea925acaeb"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "user_coordinator"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_200e5680ecc99e721203df1344c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "user_director"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_00c098c0882df5d5ed7d03f1e0c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "user_captivator"`);
        await queryRunner.query(`DROP INDEX "IDX_c977fa7c5c9c8edc243ad0c91a"`);
        await queryRunner.query(`DROP INDEX "IDX_4e35b0c2a624660f1808e7495f"`);
        await queryRunner.query(`DROP TABLE "sale_has_sallers"`);
    }

}
