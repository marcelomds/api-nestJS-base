import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTypesTable1755600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            )
        `);

    await queryRunner.query(`
            INSERT INTO user_types (name)
            VALUES ('admin_general'), ('user_tenant'), ('user_stock')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE user_types
        `);

    await queryRunner.query(`
            DELETE FROM user_types
        `);
  }
}
