import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorTableCalculator1621136722454 implements MigrationInterface {
    name = 'refactorTableCalculator1621136722454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_90fcba7f0f1ebed1031afbdc91c"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_dd49049f2f0bcf69e5bd2577d66"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_1e3fd707573086f1192ffd06801"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_ff2b146981cac4f26f7fb4ace4f"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_b97a119ba42f1dcc991050b74dd"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_07cf991839aa9a1d5e2122767c0"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "REL_90fcba7f0f1ebed1031afbdc91"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "division_pl"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "REL_dd49049f2f0bcf69e5bd2577d6"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "division_lucro"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "REL_1e3fd707573086f1192ffd0680"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "division_tax"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "REL_ff2b146981cac4f26f7fb4ace4"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "division_other_one"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "REL_b97a119ba42f1dcc991050b74d"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "division_other_two"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "REL_07cf991839aa9a1d5e2122767c"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP COLUMN "division_other_three"`);
        await queryRunner.query(`ALTER TABLE "calculations" ALTER COLUMN "balance" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" ALTER COLUMN "balance" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "division_other_three" uuid`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "REL_07cf991839aa9a1d5e2122767c" UNIQUE ("division_other_three")`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "division_other_two" uuid`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "REL_b97a119ba42f1dcc991050b74d" UNIQUE ("division_other_two")`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "division_other_one" uuid`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "REL_ff2b146981cac4f26f7fb4ace4" UNIQUE ("division_other_one")`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "division_tax" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "REL_1e3fd707573086f1192ffd0680" UNIQUE ("division_tax")`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "division_lucro" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "REL_dd49049f2f0bcf69e5bd2577d6" UNIQUE ("division_lucro")`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD "division_pl" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "REL_90fcba7f0f1ebed1031afbdc91" UNIQUE ("division_pl")`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_07cf991839aa9a1d5e2122767c0" FOREIGN KEY ("division_other_three") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_b97a119ba42f1dcc991050b74dd" FOREIGN KEY ("division_other_two") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_ff2b146981cac4f26f7fb4ace4f" FOREIGN KEY ("division_other_one") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_1e3fd707573086f1192ffd06801" FOREIGN KEY ("division_tax") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_dd49049f2f0bcf69e5bd2577d66" FOREIGN KEY ("division_lucro") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_90fcba7f0f1ebed1031afbdc91c" FOREIGN KEY ("division_pl") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
