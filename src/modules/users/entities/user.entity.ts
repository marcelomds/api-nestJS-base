import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeEntity } from './userType.entity';
import { TenantEntity } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', name: 'uuid', default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  email: string;

  @Column({ type: 'varchar', length: 512, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 256 })
  photo: string;

  @Column({ type: 'int', name: 'user_type_id' })
  userTypeId: number;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'int', name: 'tenant_id', nullable: true })
  tenantId: number | null;

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

  @ManyToOne(() => UserTypeEntity)
  @JoinTable({ name: 'user_type_id' })
  userType: UserTypeEntity;

  @ManyToOne(() => TenantEntity)
  @JoinTable({ name: 'tenant_id' })
  tenant: TenantEntity | null;
}
