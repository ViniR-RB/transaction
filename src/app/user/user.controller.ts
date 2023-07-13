import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async index() {
    return this.userService.findAll();
  }
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }
  @Patch(':id')
  async updateUserPassword(@Param('id') id: string, @Body() data) {
    return await this.userService.updateUserPassword(id, data);
  }
}
