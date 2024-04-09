import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createNeighborhoods1712289080133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS neighborhoods (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(250),
                city VARCHAR(250),
                uf VARCHAR(2),
                active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IDX_NEIGHBORHOOD_NAME ON neighborhoods (name);
        `);

        await queryRunner.query(`
            CREATE INDEX IDX_NEIGHBORHOOD_CITY ON neighborhoods (city);
        `);

        await queryRunner.query(`
            CREATE INDEX IDX_NEIGHBORHOOD_UF ON neighborhoods (uf);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP INDEX IDX_NEIGHBORHOOD_NAME`);
      await queryRunner.query(`DROP INDEX IDX_NEIGHBORHOOD_CITY`);
      await queryRunner.query(`DROP INDEX IDX_NEIGHBORHOOD_UF`);
      await queryRunner.query(`DROP TABLE neighborhoods`);
    }

}
