import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordUserDto } from './dto/updatePassword.user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async index() {
    return this.userService.findAll();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUserPassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordUserDto,
  ) {
    return await this.userService.updateUserPassword(id, data);
  }
}
