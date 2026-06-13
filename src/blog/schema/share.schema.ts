import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Share extends Document {
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Blog', required: true })
  blog: Types.ObjectId;

  @Prop({ required: true })
  sharedBy: string; // userId or name

  @Prop({ required: true, enum: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy', 'other'] })
  platform: string;
}

export const ShareSchema = SchemaFactory.createForClass(Share);