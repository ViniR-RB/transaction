import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './stock.controller';
import { StockEntity } from './stock.entity';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
