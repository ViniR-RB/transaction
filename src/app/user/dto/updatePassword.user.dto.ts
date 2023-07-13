import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'Password não pode ser vazio',
  })
  password: string;
}
