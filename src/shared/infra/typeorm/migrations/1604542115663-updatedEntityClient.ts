import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedEntityClient1604542115663 implements MigrationInterface {
    name = 'updatedEntityClient1604542115663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "whatsapp" character varying(11)`);
        await queryRunner.query(`ALTER TYPE "public"."clients_gender_enum" RENAME TO "clients_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "clients_gender_enum" AS ENUM('FEMININO', 'MASCULINO', 'OUTRO')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "gender" TYPE "clients_gender_enum" USING "gender"::"text"::"clients_gender_enum"`);
        await queryRunner.query(`DROP TYPE "clients_gender_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "clients_gender_enum_old" AS ENUM('FEMININO', 'MASCULINO')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "gender" TYPE "clients_gender_enum_old" USING "gender"::"text"::"clients_gender_enum_old"`);
        await queryRunner.query(`DROP TYPE "clients_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "clients_gender_enum_old" RENAME TO  "clients_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "whatsapp"`);
    }

}
