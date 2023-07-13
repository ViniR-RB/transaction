import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create.stock.dto';
import { StockService } from './stock.service';
import { UpdateStockDto } from './dto/update.stock.dto';

@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async index() {
    return await this.stockService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateStockDto) {
    return await this.stockService.create(body);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: string) {
    return await this.stockService.findOneOrFail(id);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() data: UpdateStockDto) {
    return await this.stockService.updatedById(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    return await this.stockService.deleteById(id);
  }
}
