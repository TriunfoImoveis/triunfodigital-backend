import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedFieldSaleOneToOneForManyToOne1602681516027 implements MigrationInterface {
    name = 'modifiedFieldSaleOneToOneForManyToOne1602681516027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3487bb8867c7fbd3616e08c5fe7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_200e5680ecc99e721203df1344c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_1448e2ebb4544661fea925acaeb"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_3487bb8867c7fbd3616e08c5fe7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_67b723fb4b5f1a93f396adb409f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_00c098c0882df5d5ed7d03f1e0c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_200e5680ecc99e721203df1344c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_1448e2ebb4544661fea925acaeb"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3487bb8867c7fbd3616e08c5fe7" FOREIGN KEY ("client_buyer") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f" FOREIGN KEY ("client_saller") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c" FOREIGN KEY ("user_captivator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_200e5680ecc99e721203df1344c" FOREIGN KEY ("user_director") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_1448e2ebb4544661fea925acaeb" FOREIGN KEY ("user_coordinator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_1448e2ebb4544661fea925acaeb"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_200e5680ecc99e721203df1344c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_3487bb8867c7fbd3616e08c5fe7"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_1448e2ebb4544661fea925acaeb" UNIQUE ("user_coordinator")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_200e5680ecc99e721203df1344c" UNIQUE ("user_director")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_00c098c0882df5d5ed7d03f1e0c" UNIQUE ("user_captivator")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_67b723fb4b5f1a93f396adb409f" UNIQUE ("client_saller")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_3487bb8867c7fbd3616e08c5fe7" UNIQUE ("client_buyer")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_1448e2ebb4544661fea925acaeb" FOREIGN KEY ("user_coordinator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_200e5680ecc99e721203df1344c" FOREIGN KEY ("user_director") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_00c098c0882df5d5ed7d03f1e0c" FOREIGN KEY ("user_captivator") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_67b723fb4b5f1a93f396adb409f" FOREIGN KEY ("client_saller") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_3487bb8867c7fbd3616e08c5fe7" FOREIGN KEY ("client_buyer") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
