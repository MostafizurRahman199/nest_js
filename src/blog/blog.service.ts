import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Blog } from './schema/blog.schema';
import { View } from './schema/view.schema';
import { Share } from './schema/share.schema';
import { React } from './schema/react.schema';
import { Comment } from './schema/comment.schema';
import { Tag } from './schema/tag.schema';

import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AddViewDto, AddShareDto, AddReactDto, AddCommentDto } from './dto/blog-interaction.dto';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) 
    private readonly blogModel: Model<Blog>,

    @InjectModel(View.name) 
    private readonly viewModel: Model<View>,

    @InjectModel(Share.name) 
    private readonly shareModel: Model<Share>,

    @InjectModel(React.name) 
    private readonly reactModel: Model<React>,
    
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,

    @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
  ) {}

  // ─── TAG OPERATIONS ───────────────────────────────────────────────────────

  async createTag(dto: CreateTagDto): Promise<Tag> {
    return this.tagModel.create(dto);
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  // ─── BLOG CRUD ────────────────────────────────────────────────────────────

  async createBlog(dto: CreateBlogDto): Promise<Blog> {
    return this.blogModel.create(dto);
  }

  async getAllBlogs(): Promise<Blog[]> {
    return this.blogModel
      .find()
      .populate('tags')
      .populate('views')
      .populate('shares')
      .populate('comments')
      .populate('reacts')
      .exec();
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.blogModel
      .findById(id)
      .populate('tags')
      .populate('views')
      .populate('shares')
      .populate('comments')
      .populate('reacts')
      .exec();

    if (!blog) throw new NotFoundException(`Blog with id ${id} not found`);
    return blog;
  }

  async getBlogBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogModel
      .findOne({ slug })
      .populate('tags')
      .populate('views')
      .populate('shares')
      .populate('comments')
      .populate('reacts')
      .exec();

    if (!blog) throw new NotFoundException(`Blog with slug "${slug}" not found`);
    return blog;
  }

  async updateBlog(id: string, dto: UpdateBlogDto): Promise<Blog> {
    const updated = await this.blogModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(`Blog with id ${id} not found`);
    return updated;
  }

  async deleteBlog(id: string): Promise<{ message: string }> {
    const blog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!blog) throw new NotFoundException(`Blog with id ${id} not found`);

    // Clean up related documents
    await Promise.all([
      this.viewModel.deleteMany({ blog: blog._id }),
      this.shareModel.deleteMany({ blog: blog._id }),
      this.reactModel.deleteMany({ blog: blog._id }),
      this.commentModel.deleteMany({ blog: blog._id }),
    ]);

    return { message: 'Blog and all related data deleted successfully' };
  }

  // ─── INTERACTIONS ─────────────────────────────────────────────────────────

  async addView(dto: AddViewDto): Promise<Blog> {
    const view = await this.viewModel.create({
      blog: dto.blogId,
      userId: dto.userId,
    });

    const updated = await this.blogModel
      .findByIdAndUpdate(
        dto.blogId,
        { $push: 
          { views: view._id }, 
          $inc: { viewCount: 1 } 
        },
        { new: true },
      )
      .exec();

    if (!updated) throw new NotFoundException(`Blog with id ${dto.blogId} not found`);
    return updated;
  }

  async addShare(dto: AddShareDto): Promise<Blog> {

    const share = await this.shareModel.create({ 
      blog: dto.blogId, 
      sharedBy: dto.sharedBy,
      platform: dto.platform 
    });

    const updated = await this.blogModel
      .findByIdAndUpdate(
        dto.blogId,
        { $push: 
          { shares: share._id }, 
          $inc: { shareCount: 1 } 
        },
        { new: true },
      )
      .exec();

    if (!updated) throw new NotFoundException(`Blog with id ${dto.blogId} not found`);
    return updated;
  }

  async addReact(dto: AddReactDto): Promise<Blog> {
    // One user can react only once — upsert existing reaction
    const react = await this.reactModel.findOneAndUpdate(
      { blog: dto.blogId, reactedBy: dto.reactedBy },
      { reactionType: dto.reactionType },
      { upsert: true, new: true },
    );

    const blog = await this.blogModel.findById(dto.blogId);
    if (!blog) throw new NotFoundException(`Blog with id ${dto.blogId} not found`);

    if (!blog.reacts.includes(react._id as any)) {
      const updated = await this.blogModel
        .findByIdAndUpdate(
          dto.blogId,
          { $push: 
            { reacts: react._id }, 
            $inc: { reactCount: 1 } 
          },
          { new: true },
        )
        .exec();

      if (!updated) throw new NotFoundException(`Blog with id ${dto.blogId} not found`);
      return updated;
    }
    return blog;
  }

  async addComment(dto: AddCommentDto): Promise<Blog> {
    const comment = await this.commentModel.create({
      blog: dto.blogId,
      commentedBy: dto.commentedBy,
      content: dto.content,
      parentComment: dto.parentComment ? new Types.ObjectId(dto.parentComment) : undefined,
    });

    const updated = await this.blogModel
      .findByIdAndUpdate(
        dto.blogId,
        { $push: 
          { comments: comment._id }, 
          $inc: { commentCount: 1 } 
        },
        { new: true },
      )
      .exec();

    if (!updated) throw new NotFoundException(`Blog with id ${dto.blogId} not found`);
    return updated;
  }

  async getComments(blogId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ 
        blog: blogId, 
        parentComment: null 
      }) // top-level only
      .populate({ path: 'parentComment' })
      .exec();
  }
}
