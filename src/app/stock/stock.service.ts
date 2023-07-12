import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntity } from './stock.entity';

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

  async create(data) {
    return await this.stockRepository.save(this.stockRepository.create(data));
  }

  async updatedById(id: string, data) {
    const stock = await this.findOneOrFail(id);
    this.stockRepository.merge(stock, data);
    return await this.stockRepository.save(stock);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.stockRepository.delete(id);
  }
}
