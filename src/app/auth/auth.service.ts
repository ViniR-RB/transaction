import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<UserEntity | null> {
    const user = await this.userService.findOneById(payload.sub);
    return user;
  }

  async login(data: LoginDto): Promise<any> {
    const user = await this.userService.findOneByEmailAndPassword(data);
    const payload = { sub: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      acess_token: token,
    };
  }

  async signIn(data: CreateUserDto) {
    return await this.userService.create(data);
  }
}
