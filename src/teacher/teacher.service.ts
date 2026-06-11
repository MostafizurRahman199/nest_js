import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher.name) private teacherModel:Model<TeacherDocument>
    ){}


    async createTeacher(data:Partial<Teacher>):Promise<Teacher>{
        const newTeacher = new this.teacherModel(data);
        return newTeacher.save();
    }

    async getAllTeacher():Promise<Teacher[]>{
        return this.teacherModel.find().exec();
    }

    async getTeacherById(id:string):Promise<Teacher | null> {
        return this.teacherModel.findById(id).exec();
    }

    async updateTeacher(id: string, data: Partial<Teacher>): Promise<Teacher | null> {
    return this.teacherModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

}
