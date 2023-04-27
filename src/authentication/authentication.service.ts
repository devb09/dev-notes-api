import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { HandleMongoError } from 'src/utils/handle-error';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createAuthenticationDto: CreateUserInput) {
    try {
      const user = new this.userModel(createAuthenticationDto);
      console.log('user');
      console.log(user);
      return;
    } catch (error) {
      HandleMongoError(error.code);
    }
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: any) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
