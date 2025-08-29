import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsTable1756380061367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        stock INT NOT NULL,
        category_id int NOT NULL,
        is_active boolean NOT NULL DEFAULT true,
        created_by int NOT NULL,
        tenant_id int NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP NULL,
        CONSTRAINT "FK_user_tenant" FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS products`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
