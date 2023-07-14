import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OPERATION_CHOICES } from '../transaction.entity';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsNumber()
  @IsNotEmpty()
  brokerage: number;
  @IsNumber()
  @IsNotEmpty()
  priceUnit: number;
  @IsNumber()
  @IsNotEmpty()
  taxB3: number;
  @IsString()
  @IsNotEmpty()
  operation: OPERATION_CHOICES;
  @IsString()
  @IsNotEmpty()
  stock: string;
}
