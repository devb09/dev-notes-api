import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleMongoError } from 'src/utils/handle-error';
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
    try {
      const newCategory = new this.categoryModel(createCategoryInput);
      return await newCategory.save();
    } catch (error) {
      HandleMongoError(error.code);
    }
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    if (categories.length < 1)
      throw new NotFoundException('There is not categories');
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
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

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
