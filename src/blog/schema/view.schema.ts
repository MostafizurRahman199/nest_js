import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class View extends Document {
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Blog', required: true })
  blog: Types.ObjectId;

  @Prop()
  userId: string; // optional — track logged-in user
}

export const ViewSchema = SchemaFactory.createForClass(View);