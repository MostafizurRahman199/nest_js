import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AddViewDto, AddShareDto, AddReactDto, AddCommentDto } from './dto/blog-interaction.dto';
import { CreateTagDto } from './dto/tag.dto';

@Controller('blog')
export class BlogController {
  
  constructor(private readonly blogService: BlogService) {}

  // ─── TAG ENDPOINTS ────────────────────────────────────────────────────────

  @Post('tag')
  @HttpCode(HttpStatus.CREATED)
  async createTag(@Body() dto: CreateTagDto) {
    const tag = await this.blogService.createTag(dto);
    return { statusCode: HttpStatus.CREATED, message: 'Tag created', data: tag };
  }

  @Get('tags')
  async getAllTags() {
    const tags = await this.blogService.getAllTags();
    return { statusCode: HttpStatus.OK, message: 'Tags fetched', data: tags };
  }

  // ─── BLOG CRUD ────────────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() dto: CreateBlogDto) {
    const blog = await this.blogService.createBlog(dto);
    return { 
      statusCode: HttpStatus.CREATED, 
      message: 'Blog created successfully', 
      data: blog 
    };
  }

  @Get()
  async getAllBlogs() {
    const blogs = await this.blogService.getAllBlogs();
    return { 
      statusCode: HttpStatus.OK, 
      message: 'Blogs fetched successfully', 
      data: blogs 
    };
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    const blog = await this.blogService.getBlogById(id);
    return { 
      statusCode: HttpStatus.OK, 
      message: 'Blog fetched successfully', 
      data: blog 
    };
  }

  @Get('slug/:slug')
  async getBlogBySlug(@Param('slug') slug: string) {
    const blog = await this.blogService.getBlogBySlug(slug);
    return { 
      statusCode: HttpStatus.OK, 
      message: 'Blog fetched successfully', 
      data: blog 
    };
  }

  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    const blog = await this.blogService.updateBlog(id, dto);
    return { 
      statusCode: HttpStatus.OK, 
      message: 'Blog updated successfully', 
      data: blog 
    };
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    const result = await this.blogService.deleteBlog(id);
    return { 
      statusCode: HttpStatus.OK, ...result };
  }

  // ─── INTERACTIONS ─────────────────────────────────────────────────────────

  @Post('view')
  @HttpCode(HttpStatus.CREATED)
  async addView(@Body() dto: AddViewDto) {
    const blog = await this.blogService.addView(dto);
    return { statusCode: HttpStatus.CREATED, message: 'View recorded', data: blog };
  }

  @Post('share')
  @HttpCode(HttpStatus.CREATED)
  async addShare(@Body() dto: AddShareDto) {
    const blog = await this.blogService.addShare(dto);
    return { statusCode: HttpStatus.CREATED, message: 'Share recorded', data: blog };
  }

  @Post('react')
  @HttpCode(HttpStatus.CREATED)
  async addReact(@Body() dto: AddReactDto) {
    const blog = await this.blogService.addReact(dto);
    return { statusCode: HttpStatus.CREATED, message: 'Reaction recorded', data: blog };
  }

  @Post('comment')
  @HttpCode(HttpStatus.CREATED)
  async addComment(@Body() dto: AddCommentDto) {
    const blog = await this.blogService.addComment(dto);
    return { statusCode: HttpStatus.CREATED, message: 'Comment added', data: blog };
  }

  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    const comments = await this.blogService.getComments(id);
    return { statusCode: HttpStatus.OK, message: 'Comments fetched', data: comments };
  }
}
