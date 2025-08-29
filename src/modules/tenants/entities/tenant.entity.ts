import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tenants' })
export class TenantEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', name: 'uuid', default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  email: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 256, nullable: true })
  document: string | null;

  @Column({ type: 'varchar', length: 256, nullable: true })
  logo: string | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;
}
