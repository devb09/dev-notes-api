import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id-pipe.pipe';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categoryAll' })
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(
    @Args('id', { type: () => String }, ParseObjectIdPipe) id: string,
  ) {
    return await this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @Args('id', ParseObjectIdPipe) categoryID: string,
  ) {
    return await this.categoryService.update(categoryID, updateCategoryInput);
  }

  @Mutation(() => Category)
  async removeCategory(
    @Args('id', { type: () => String }, ParseObjectIdPipe) id: string,
  ) {
    return await this.categoryService.remove(id);
  }
}
