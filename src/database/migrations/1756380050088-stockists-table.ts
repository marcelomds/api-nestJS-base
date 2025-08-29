import { MigrationInterface, QueryRunner } from 'typeorm';

export class StockistsTable1756380050088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE stockists (
        id SERIAL PRIMARY KEY,
        uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
        phone VARCHAR(255) NOT NULL,
        document VARCHAR(255) NOT NULL,
        address VARCHAR(255) NULL,
        user_id int NOT NULL,
        is_active boolean NOT NULL DEFAULT true,
        tenant_id int NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP NULL,
        CONSTRAINT "FK_user_tenant" FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE SET NULL,
        CONSTRAINT "FK_user" FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS stockists`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
