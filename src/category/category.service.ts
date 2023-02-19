import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const newCategory = new this.categoryModel(createCategoryInput);
    return await newCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryInput,
      { new: true },
    );
    if (!updatedCategory)
      throw new NotFoundException(`${updateCategoryInput.code} not found`);
    return updatedCategory;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
