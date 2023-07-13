import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  name_enterprise: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'Formato de CNPJ inválido.',
  })
  cnpj: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]{4}[0-9]$/, {
    message: 'Formato de Código Inválido',
  })
  code: string;
}
