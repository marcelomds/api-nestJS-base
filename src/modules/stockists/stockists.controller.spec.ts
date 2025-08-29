import { Test, TestingModule } from '@nestjs/testing';
import { StockistsController } from './stockists.controller';
import { StockistsService } from './stockists.service';

describe('StockistsController', () => {
  let controller: StockistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockistsController],
      providers: [StockistsService],
    }).compile();

    controller = module.get<StockistsController>(StockistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
