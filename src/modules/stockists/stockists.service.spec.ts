import { Test, TestingModule } from '@nestjs/testing';
import { StockistsService } from './stockists.service';

describe('StockistsService', () => {
  let service: StockistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockistsService],
    }).compile();

    service = module.get<StockistsService>(StockistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
