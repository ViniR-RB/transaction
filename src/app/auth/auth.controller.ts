import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sigin')
  @HttpCode(HttpStatus.OK)
  async signIn(user: CreateUserDto) {
    return this.authService.signIn(user);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
