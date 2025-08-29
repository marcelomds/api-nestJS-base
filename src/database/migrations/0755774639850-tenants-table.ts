import { MigrationInterface, QueryRunner } from 'typeorm';

export class TenantsTable0755774639850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE tenants (
        id SERIAL PRIMARY KEY,
        uuid UUID DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NULL,
        document VARCHAR(255) NOT NULL,
        logo VARCHAR(255) NULL, 
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP NULL
      )
    `);

    await queryRunner.query(`
      INSERT INTO tenants (id, uuid, name, email, phone, document, logo, is_active)
      VALUES
        (1, uuid_generate_v4(), 'Empresa MM', 'tenant@email.com', 'password', '1231231234123', NULL, true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tenants`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
