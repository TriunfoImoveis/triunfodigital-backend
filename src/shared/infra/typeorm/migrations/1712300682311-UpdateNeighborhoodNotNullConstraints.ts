import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNeighborhoodNotNullConstraints1712300682311 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE neighborhoods
    ALTER COLUMN name SET NOT NULL,
    ALTER COLUMN city SET NOT NULL,
    ALTER COLUMN uf SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
