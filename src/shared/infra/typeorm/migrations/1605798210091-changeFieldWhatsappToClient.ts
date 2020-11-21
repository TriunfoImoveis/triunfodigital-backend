import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFieldWhatsappToClient1605798210091 implements MigrationInterface {
    name = 'changeFieldWhatsappToClient1605798210091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "whatsapp"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "whatsapp" character varying(14)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "whatsapp"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "whatsapp" character varying(11)`);
    }

}
