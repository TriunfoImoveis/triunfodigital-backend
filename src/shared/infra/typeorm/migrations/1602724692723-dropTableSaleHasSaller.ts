import {MigrationInterface, QueryRunner} from "typeorm";

export class dropTableSaleHasSaller1602724692723 implements MigrationInterface {
    name = 'dropTableSaleHasSaller1602724692723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" DROP CONSTRAINT "FK_c977fa7c5c9c8edc243ad0c91a2"`);
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" DROP CONSTRAINT "FK_4e35b0c2a624660f1808e7495f2"`);
        await queryRunner.query(`DROP INDEX "IDX_c977fa7c5c9c8edc243ad0c91a"`);
        await queryRunner.query(`DROP INDEX "IDX_4e35b0c2a624660f1808e7495f"`);
        await queryRunner.query(`DROP TABLE "sale_has_sallers"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_has_sallers" ("salesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_dc3c3c0e24fcc1d88687fa7f7f1" PRIMARY KEY ("salesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e35b0c2a624660f1808e7495f" ON "sale_has_sallers" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c977fa7c5c9c8edc243ad0c91a" ON "sale_has_sallers" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" ADD CONSTRAINT "FK_4e35b0c2a624660f1808e7495f2" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_sallers" ADD CONSTRAINT "FK_c977fa7c5c9c8edc243ad0c91a2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
