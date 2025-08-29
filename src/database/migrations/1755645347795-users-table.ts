import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1755645347795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
  CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(256) NOT NULL,
    email varchar(256) NOT NULL,
    photo varchar(256) NULL,
    password varchar(256) NOT NULL,
    user_type_id int NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    tenant_id int NULL,
    created_at timestamp NOT NULL DEFAULT now(),  
    updated_at timestamp NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP NULL,
    CONSTRAINT "FK_user_user_type" FOREIGN KEY (user_type_id) REFERENCES user_types (id) ON DELETE SET NULL,
    CONSTRAINT "FK_user_tenant" FOREIGN KEY (tenant_id) REFERENCES tenants (id) ON DELETE SET NULL
  )`);

    await queryRunner.query(`
  INSERT INTO users (id, uuid, name, email, photo, password, user_type_id, is_active, tenant_id)
  VALUES
    (1, uuid_generate_v4(), 'Admin', 'admin@email.com', NULL, 'password', 1, true, NULL),
    (
      2,  uuid_generate_v4(),
      'Marcelo Moreira',
      'marcelo@email.com',
      NULL,
      'password',
      2,
      true,
      1
    ),
    (
      3,  uuid_generate_v4(),
      'Estoquista',
      'estoquista@email.com',
      NULL,
      'password',
      3,
      true,
      1
    )
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
