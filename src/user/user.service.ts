import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User} from './schema/user.schema';

@Injectable()
export class UserService {
   
    constructor(
        @InjectModel(User.name) 
        private userModel:Model<User>
    ) {}

    
    async createUser(data:Partial<User>):Promise<User>{
        const newUser = new this.userModel(data);
        return newUser.save();
    }

    async getAllUser():Promise<User[]>{
        return this.userModel.find().exec();
    }
    
}
