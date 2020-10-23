import {MigrationInterface, QueryRunner} from "typeorm";

export class removeFieldsDetailsPaymentAndObservation1602860640097 implements MigrationInterface {
    name = 'removeFieldsDetailsPaymentAndObservation1602860640097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "details_payment"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "observation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "observation" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "details_payment" character varying(150)`);
    }

}
