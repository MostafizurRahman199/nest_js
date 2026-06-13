import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Schema as MongoSchema } from "mongoose";
import { Profile } from "./profile.schema";


@Schema({timestamps:true})
export class Employee extends Document{
    @Prop({required:true})
    employeeCode:string;

    @Prop({required:true})
    salary:number;

    @Prop({required:true})
    department:string;

    @Prop({required:true})
    joinDate:Date;

    @Prop({required:true})
    designation:string;

    @Prop({required:true})
    employeeStatus:string;

    @Prop({type:MongoSchema.Types.ObjectId, ref:'Profile',required:true})
    profile:Profile;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
