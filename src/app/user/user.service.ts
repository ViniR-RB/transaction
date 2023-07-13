import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordUserDto } from './dto/updatePassword.user.dto';
import UserEntity from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          id: id,
        },
        select: [
          'id',
          'email',
          'firstName',
          'lastName',
          'createdAt',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async create(data: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (user !== null) {
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
    }
    const hashedPassowrd = await bcrypt.hash(data.password, 10);

    data.password = hashedPassowrd;

    await this.userRepository.save(this.userRepository.create(data));
  }

  async updateUserPassword(id: string, data: UpdatePasswordUserDto) {
    const user = await this.findOneById(id);
    data.password = await bcrypt.hash(data.password, 10);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }
}
