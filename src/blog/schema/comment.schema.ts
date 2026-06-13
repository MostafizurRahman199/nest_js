import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Blog', required: true })
  blog: Types.ObjectId;

  @Prop({ required: true })
  commentedBy: string; // userId or name

  @Prop({ required: true })
  content: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Comment', default: null })
  parentComment: Types.ObjectId; // null = top-level, set = reply
}

export const CommentSchema = SchemaFactory.createForClass(Comment);