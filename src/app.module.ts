import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { StockistsModule } from './modules/stockists/stockists.module';
import { ProductsModule } from './modules/products/products.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenantsController } from './modules/tenants/tenants.controller';
import { TenantsService } from './modules/tenants/tenants.service';
import { DbModule } from './database/db.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    TenantsModule,
    CategoriesModule,
    StockistsModule,
    ProductsModule,
    TenantsModule,
  ],
  controllers: [AppController, TenantsController],
  providers: [AppService, TenantsService],
})
export class AppModule {}
