import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create.stock.dto';
import { StockEntity } from './stock.entity';
import { UpdateStockDto } from './dto/update.stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
  ) {}

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.stockRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateStockDto) {
    const stock = await this.stockRepository.findOneBy({
      code: data.code,
      cnpj: data.cnpj,
    });
    if (stock !== null) {
      throw new HttpException('Stock já existe', HttpStatus.CONFLICT);
    }
    return await this.stockRepository.save(this.stockRepository.create(data));
  }

  async updatedById(id: string, data: UpdateStockDto) {
    const stock = await this.findOneOrFail(id);
    this.stockRepository.merge(stock, data);
    return await this.stockRepository.save(stock);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.stockRepository.delete(id);
  }
}
