import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateStockDto {
  @IsString()
  @IsNotEmpty()
  @Matches('^[A-Z]{4}d$')
  code: string;
}
