import {MigrationInterface, QueryRunner} from "typeorm";

export class relationshipBankDataToUser1612239028079 implements MigrationInterface {
    name = 'relationshipBankDataToUser1612239028079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_data" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD CONSTRAINT "UQ_5f258e21b20d6883f1e4b62d0bd" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD CONSTRAINT "FK_5f258e21b20d6883f1e4b62d0bd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_data" DROP CONSTRAINT "FK_5f258e21b20d6883f1e4b62d0bd"`);
        await queryRunner.query(`ALTER TABLE "bank_data" DROP CONSTRAINT "UQ_5f258e21b20d6883f1e4b62d0bd"`);
        await queryRunner.query(`ALTER TABLE "bank_data" DROP COLUMN "user_id"`);
    }

}
