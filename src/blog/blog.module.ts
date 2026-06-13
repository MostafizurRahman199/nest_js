import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

import { Blog, BlogSchema } from './schema/blog.schema';
import { View, ViewSchema } from './schema/view.schema';
import { Share, ShareSchema } from './schema/share.schema';
import { React, ReactSchema } from './schema/react.schema';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Tag, TagSchema } from './schema/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: View.name, schema: ViewSchema },
      { name: Share.name, schema: ShareSchema },
      { name: React.name, schema: ReactSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
