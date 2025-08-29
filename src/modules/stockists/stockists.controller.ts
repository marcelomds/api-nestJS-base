import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockistsService } from './stockists.service';
import { CreateStockistDto } from './dto/create-stockist.dto';
import { UpdateStockistDto } from './dto/update-stockist.dto';

@Controller('stockists')
export class StockistsController {
  constructor(private readonly stockistsService: StockistsService) {}

  @Post()
  create(@Body() createStockistDto: CreateStockistDto) {
    return this.stockistsService.create(createStockistDto);
  }

  @Get()
  findAll() {
    return this.stockistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockistDto: UpdateStockistDto) {
    return this.stockistsService.update(+id, updateStockistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockistsService.remove(+id);
  }
}
