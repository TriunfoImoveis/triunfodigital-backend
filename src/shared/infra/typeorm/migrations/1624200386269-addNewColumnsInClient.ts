import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewColumnsInClient1624200386269 implements MigrationInterface {
    name = 'addNewColumnsInClient1624200386269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "cnpj" character varying(14)`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_c2528f5ea78df3e939950b861c0" UNIQUE ("cnpj")`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "address" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "cpf" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "date_birth" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "civil_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "number_children" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "gender" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "gender" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "number_children" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "civil_status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "date_birth" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "cpf" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_c2528f5ea78df3e939950b861c0"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "cnpj"`);
    }

}
