import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class React extends Document {
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Blog', required: true })
  blog: Types.ObjectId;

  @Prop({ required: true })
  reactedBy: string; // userId

  @Prop({ required: true, enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'] })
  reactionType: string;
}

export const ReactSchema = SchemaFactory.createForClass(React);