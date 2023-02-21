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
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostInput,
      { new: true },
    );
    if (!updatedPost)
      throw new NotFoundException(`${updatePostInput.title} not found`);
    return updatedPost;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
