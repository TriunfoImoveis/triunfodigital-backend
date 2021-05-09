import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedBankDataInUsers1620602279877 implements MigrationInterface {
    name = 'modifiedBankDataInUsers1620602279877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_data" DROP CONSTRAINT "FK_5f258e21b20d6883f1e4b62d0bd"`);
        await queryRunner.query(`ALTER TABLE "bank_data" DROP CONSTRAINT "UQ_5f258e21b20d6883f1e4b62d0bd"`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD CONSTRAINT "FK_5f258e21b20d6883f1e4b62d0bd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_data" DROP CONSTRAINT "FK_5f258e21b20d6883f1e4b62d0bd"`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD CONSTRAINT "UQ_5f258e21b20d6883f1e4b62d0bd" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD CONSTRAINT "FK_5f258e21b20d6883f1e4b62d0bd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
