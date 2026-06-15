import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";



@Schema()
@ObjectType()
export class Book extends Document{

    @Field(()=>ID)
    declare _id: Types.ObjectId;

    @Field(()=>String)
    @Prop({required:true})
    title:string;

    @Field(()=>String)
    @Prop({required:true})
    author:string;

    @Field({nullable:true})
    @Prop()
    genre?:string;

    @Field({nullable:true})
    @Prop()
    description?:string;


    @Field(()=>String)
    @Prop({required:true})
    price:string;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
