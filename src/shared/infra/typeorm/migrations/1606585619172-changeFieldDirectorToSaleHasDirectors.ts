import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldDirectorToSaleHasDirectors1606585619172 implements MigrationInterface {
    name = 'changeFieldDirectorToSaleHasDirectors1606585619172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_200e5680ecc99e721203df1344c"`);
        await queryRunner.query(`CREATE TABLE "sale_has_directors" ("sale_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_5611c9fd1b21801430ceb830733" PRIMARY KEY ("sale_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e8fd1a9df5d8429491c491fdd4" ON "sale_has_directors" ("sale_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_92c1b5531b85dec4bcb0e8d04d" ON "sale_has_directors" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "user_director"`);
        await queryRunner.query(`ALTER TABLE "sale_has_directors" ADD CONSTRAINT "FK_e8fd1a9df5d8429491c491fdd4b" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_has_directors" ADD CONSTRAINT "FK_92c1b5531b85dec4bcb0e8d04d0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_has_directors" DROP CONSTRAINT "FK_92c1b5531b85dec4bcb0e8d04d0"`);
        await queryRunner.query(`ALTER TABLE "sale_has_directors" DROP CONSTRAINT "FK_e8fd1a9df5d8429491c491fdd4b"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "user_director" uuid NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_92c1b5531b85dec4bcb0e8d04d"`);
        await queryRunner.query(`DROP INDEX "IDX_e8fd1a9df5d8429491c491fdd4"`);
        await queryRunner.query(`DROP TABLE "sale_has_directors"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_200e5680ecc99e721203df1344c" FOREIGN KEY ("user_director") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
