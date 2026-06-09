import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    getUser(){
        return 'User Data Fetch Successfully!!';
    }
}
