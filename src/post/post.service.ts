import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { HandleMongoError } from 'src/utils/handle-error';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(createPostInput: CreatePostInput) {
    try {
      console.log(JSON.stringify(createPostInput.content));
      const newPost = new this.postModel(createPostInput);
      return await newPost.save();
    } catch (error) {
      HandleMongoError(error.code);
    }
  }

  async findAll() {
    const posts = await this.postModel.find();
    if (posts.length < 1) throw new NotFoundException('There are no posts');
    return posts;
  }

  async findOne(id: string) {
    const Post = await this.postModel.findById(id);
    if (!Post) throw new NotFoundException('Post not found');
    return Post;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const updatedpost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostInput,
      { new: true },
    );
    if (!updatedpost)
      throw new NotFoundException(`${updatePostInput.title} not found`);
    return updatedpost;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
