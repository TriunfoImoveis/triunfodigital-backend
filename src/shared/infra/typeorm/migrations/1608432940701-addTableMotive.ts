import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableMotive1608432940701 implements MigrationInterface {
    name = 'addTableMotive1608432940701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "motives" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(100) NOT NULL, CONSTRAINT "PK_6e6249ba2b87d5a2e44f66608d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "motives"`);
    }

}
