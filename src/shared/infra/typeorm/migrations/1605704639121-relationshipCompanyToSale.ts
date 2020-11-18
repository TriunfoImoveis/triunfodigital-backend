import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipCompanyToSale1605704639121 implements MigrationInterface {
    name = 'relationshipCompanyToSale1605704639121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "percentage_company" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_6126ce1093dd7ed2d023c47633c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_6126ce1093dd7ed2d023c47633c"`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "percentage_company" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "company_id"`);
    }

}
