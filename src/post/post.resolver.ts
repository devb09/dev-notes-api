import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id-pipe.pipe';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'postAll' })
  async findAll() {
    return await this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  async findOne(
    @Args('id', { type: () => String }, ParseObjectIdPipe) id: string,
  ) {
    return await this.postService.findOne(id);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Args('id', ParseObjectIdPipe) postID: string,
  ) {
    return await this.postService.update(postID, updatePostInput);
  }

  @Mutation(() => Post)
  async removePost(
    @Args('id', { type: () => Int }, ParseObjectIdPipe) id: number,
  ) {
    return await this.postService.remove(id);
  }
}
