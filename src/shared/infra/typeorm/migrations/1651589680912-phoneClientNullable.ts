import {MigrationInterface, QueryRunner} from "typeorm";

export class phoneClientNullable1651589680912 implements MigrationInterface {
    name = 'phoneClientNullable1651589680912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
