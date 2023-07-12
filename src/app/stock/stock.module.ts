import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
