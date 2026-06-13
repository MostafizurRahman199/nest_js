import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string; // userId or author name

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: '' })
  thumbnail: string;

  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'Tag' }], default: [] })
  tags: Types.ObjectId[];

  @Prop({ required: true, enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  // Embedded counts — updated via triggers/service logic
  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  shareCount: number;

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ default: 0 })
  reactCount: number;

  // Reference arrays to embedded collections
  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'View' }], default: [] })
  views: MongoSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'Share' }], default: [] })
  shares: MongoSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'Comment' }], default: [] })
  comments: MongoSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'React' }], default: [] })
  reacts: MongoSchema.Types.ObjectId[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);