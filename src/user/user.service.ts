import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { HandleMongoError } from 'src/utils/handle-error';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // async create(createUserInput: CreateUserInput) {
  //   try {
  //     const newUser = new this.userModel(createUserInput);
  //     return await newUser.save();
  //   } catch (error) {
  //     HandleMongoError(error.code);
  //   }
  // }

  async findAll() {
    const users = await this.userModel.find();
    if (users.length < 1) throw new NotFoundException('There is not users');
    return users;
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserInput,
      { new: true },
    );
    if (!updatedUser)
      throw new NotFoundException(`${updateUserInput.username} not found`);
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
