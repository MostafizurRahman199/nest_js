import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.schema';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService:TeacherService){}

    @Post()
    async addTeacher(@Body() data:Partial<Teacher>){
        return this.teacherService.createTeacher(data);
    }

    @Get()
    async getAllTeacher(){
        return this.teacherService.getAllTeacher();
    }

    @Get(':id')
    async getTeacherById(
        @Param('id') id:string
    ){
        return this.teacherService.getTeacherById(id);
    }

    @Put(':id')
    async updateTeacher(
        @Param('id') id:string,
        @Body() data:Partial<Teacher>
    ){
        return this.teacherService.updateTeacher(id,data);
    }

}
