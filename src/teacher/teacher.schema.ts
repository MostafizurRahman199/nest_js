import {Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type TeacherDocument = Teacher & Document;


@Schema({timestamps:true})
export class Teacher{
    @Prop({required:true})
    name:string;

    @Prop({required:true})
    age:number;

    @Prop()
    subject?:[string];

    @Prop()
    email?:string;

    @Prop({required:true})
    phone:string;

    @Prop({required:true})
    address:string;

   @Prop({required:true})
   salary:number;
   
   @Prop({required:true})
   gender:string;

   @Prop({required:true})
   designation:string;

   @Prop({required:true})
   status:string;

   
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
