import { Module } from '@nestjs/common';
import { StockistsService } from './stockists.service';
import { StockistsController } from './stockists.controller';

@Module({
  controllers: [StockistsController],
  providers: [StockistsService],
})
export class StockistsModule {}
