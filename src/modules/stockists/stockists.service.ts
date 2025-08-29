import { Injectable } from '@nestjs/common';
import { CreateStockistDto } from './dto/create-stockist.dto';
import { UpdateStockistDto } from './dto/update-stockist.dto';

@Injectable()
export class StockistsService {
  create(createStockistDto: CreateStockistDto) {
    return 'This action adds a new stockist';
  }

  findAll() {
    return `This action returns all stockists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockist`;
  }

  update(id: number, updateStockistDto: UpdateStockistDto) {
    return `This action updates a #${id} stockist`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockist`;
  }
}
