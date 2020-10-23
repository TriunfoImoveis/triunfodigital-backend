import {MigrationInterface, QueryRunner} from "typeorm";

export class createRealty1601822473847 implements MigrationInterface {
    name = 'createRealty1601822473847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "realties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enterprise" character varying(200) NOT NULL, "unit" character varying(80) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(100) NOT NULL, "neighborhood" character varying(80) NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "property_id" uuid, CONSTRAINT "PK_60a5b9d317ddade8582fdb83a80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "realties" ADD CONSTRAINT "FK_91a0ec261f3bc579c12a1558040" FOREIGN KEY ("property_id") REFERENCES "property_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realties" DROP CONSTRAINT "FK_91a0ec261f3bc579c12a1558040"`);
        await queryRunner.query(`DROP TABLE "realties"`);
    }

}
