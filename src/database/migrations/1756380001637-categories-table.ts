import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesTable1756380001637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
            CREATE TABLE categories (
                id SERIAL PRIMARY KEY,
                uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                description TEXT,
                is_active boolean NOT NULL DEFAULT true,
                tenant_id int NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                deleted_at TIMESTAMP NULL,
                CONSTRAINT "FK_user_tenant" FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE SET NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS categories`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
