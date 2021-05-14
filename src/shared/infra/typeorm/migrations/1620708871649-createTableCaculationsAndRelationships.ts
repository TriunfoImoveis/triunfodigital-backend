import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCaculationsAndRelationships1620708871649 implements MigrationInterface {
    name = 'createTableCaculationsAndRelationships1620708871649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calculations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calculator_type" character varying(150), "installment_id" uuid NOT NULL, "division_pl" uuid NOT NULL, "division_lucro" uuid NOT NULL, "division_tax" uuid NOT NULL, "division_other_one" uuid, "division_other_two" uuid, "division_other_three" uuid, CONSTRAINT "REL_c43f3ad0118823db3939d6cbca" UNIQUE ("installment_id"), CONSTRAINT "REL_90fcba7f0f1ebed1031afbdc91" UNIQUE ("division_pl"), CONSTRAINT "REL_dd49049f2f0bcf69e5bd2577d6" UNIQUE ("division_lucro"), CONSTRAINT "REL_1e3fd707573086f1192ffd0680" UNIQUE ("division_tax"), CONSTRAINT "REL_ff2b146981cac4f26f7fb4ace4" UNIQUE ("division_other_one"), CONSTRAINT "REL_b97a119ba42f1dcc991050b74d" UNIQUE ("division_other_two"), CONSTRAINT "REL_07cf991839aa9a1d5e2122767c" UNIQUE ("division_other_three"), CONSTRAINT "PK_a57a12855a44935db91c2533b71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_c43f3ad0118823db3939d6cbca6" FOREIGN KEY ("installment_id") REFERENCES "installments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_90fcba7f0f1ebed1031afbdc91c" FOREIGN KEY ("division_pl") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_dd49049f2f0bcf69e5bd2577d66" FOREIGN KEY ("division_lucro") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_1e3fd707573086f1192ffd06801" FOREIGN KEY ("division_tax") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_ff2b146981cac4f26f7fb4ace4f" FOREIGN KEY ("division_other_one") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_b97a119ba42f1dcc991050b74dd" FOREIGN KEY ("division_other_two") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calculations" ADD CONSTRAINT "FK_07cf991839aa9a1d5e2122767c0" FOREIGN KEY ("division_other_three") REFERENCES "divisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_07cf991839aa9a1d5e2122767c0"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_b97a119ba42f1dcc991050b74dd"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_ff2b146981cac4f26f7fb4ace4f"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_1e3fd707573086f1192ffd06801"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_dd49049f2f0bcf69e5bd2577d66"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_90fcba7f0f1ebed1031afbdc91c"`);
        await queryRunner.query(`ALTER TABLE "calculations" DROP CONSTRAINT "FK_c43f3ad0118823db3939d6cbca6"`);
        await queryRunner.query(`DROP TABLE "calculations"`);
    }

}
