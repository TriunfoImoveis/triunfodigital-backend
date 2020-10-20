import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedTypeEnumCivilStatusAndGender1602017403076 implements MigrationInterface {
    name = 'modifiedTypeEnumCivilStatusAndGender1602017403076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."clients_civil_status_enum" RENAME TO "clients_civil_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "clients_civil_status_enum" AS ENUM('CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "civil_status" TYPE "clients_civil_status_enum" USING "civil_status"::"text"::"clients_civil_status_enum"`);
        await queryRunner.query(`DROP TYPE "clients_civil_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."clients_gender_enum" RENAME TO "clients_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "clients_gender_enum" AS ENUM('FEMININO', 'MASCULINO')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "gender" TYPE "clients_gender_enum" USING "gender"::"text"::"clients_gender_enum"`);
        await queryRunner.query(`DROP TYPE "clients_gender_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "clients_gender_enum_old" AS ENUM('Feminino', 'Masculino')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "gender" TYPE "clients_gender_enum_old" USING "gender"::"text"::"clients_gender_enum_old"`);
        await queryRunner.query(`DROP TYPE "clients_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "clients_gender_enum_old" RENAME TO  "clients_gender_enum"`);
        await queryRunner.query(`CREATE TYPE "clients_civil_status_enum_old" AS ENUM('Casado(a)', 'Divorciado(a)', 'Solteiro(a)', 'Viúvo(a)')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "civil_status" TYPE "clients_civil_status_enum_old" USING "civil_status"::"text"::"clients_civil_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "clients_civil_status_enum"`);
        await queryRunner.query(`ALTER TYPE "clients_civil_status_enum_old" RENAME TO  "clients_civil_status_enum"`);
    }

}
