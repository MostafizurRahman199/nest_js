import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService:UserService
    ){}

    @Get()
    getUser():Promise<User[]>{
        return this.userService.getAllUser();
    }

    @Post()
    createUser(@Body() data:Partial<User>):Promise<User>{
        return this.userService.createUser(data);
    }
}
