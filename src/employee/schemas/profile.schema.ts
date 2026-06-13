import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({timestamps:true})
export class Profile extends Document{
    @Prop({required:true})      
    Name:string;

    @Prop({required:true})
    phone:string;

    @Prop({required:true})
    address:string;

    @Prop({required:true})
    gender:string;

    @Prop({required:true})
    age:number;

    @Prop({required:true})
    status:string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
