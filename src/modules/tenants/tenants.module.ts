import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantEntity } from './entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [TypeOrmModule.forFeature([TenantEntity])],
})
export class TenantsModule {}
