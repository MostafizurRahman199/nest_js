import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Address } from "./address.schema";
import { Role } from "../../guards/roles/roles.enum";

@Schema()
export class User extends Document{
    @Prop()     
    name:string;

    @Prop({ unique: true, required: true })
    email:string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: Role, default: Role.User })
    role: Role;

    @Prop()
    age:number;

    @Prop({ type: Address })
    address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);