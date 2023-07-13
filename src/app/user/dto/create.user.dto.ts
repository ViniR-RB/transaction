import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  email: string;

  @IsString()
  @Matches(/^(?=.*\d).{6,}$/, {
    message: 'Password não confere com o formato correto',
  })
  @IsNotEmpty({
    message: 'Password não pode ser vazio',
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: 'FirstName não pode ser vazio',
  })
  firstName: string;
  @IsString()
  @IsNotEmpty({
    message: 'Last Name não pode ser vazio',
  })
  lastName: string;
}
