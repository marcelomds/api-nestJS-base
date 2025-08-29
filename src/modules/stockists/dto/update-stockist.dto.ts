import { PartialType } from '@nestjs/mapped-types';
import { CreateStockistDto } from './create-stockist.dto';

export class UpdateStockistDto extends PartialType(CreateStockistDto) {}
