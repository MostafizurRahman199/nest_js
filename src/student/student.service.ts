import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        {
            id:1,
            name:'Mostafiz',
            email:'mostafiz@gmail.com',
            age:21
        },
        {
            id:2,
            name:'Tamim',
            email:'tamim@gmail.com',
            age:22
        },
        {
            id:3,
            name:'Rahim',
            email:'rahim@gmail.com',
            age:33
        },
        {
            id:4,
            name:'Karim',
            email:'karim@gmail.com',
            age:44
        }
    ];


    getAllStudents(){
        return this.students;
    }

    getStudentById(id:number){
        const filteredStudent = this.students.find((stud)=> stud.id === id);
        

        if(!filteredStudent){
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return filteredStudent;
    }
    // POST
    createStudent(data:{name:string,email:string,age:number}){
        const newStudent = {
            id:Date.now(),
            ...data,
        };

        this.students.push(newStudent);
        return this.students;
    }

    // PUT
    updateStudent(id:number, data:{name:string, age:number, email:string}){

        const index = this.students.findIndex((stud)=>stud.id === id) 

        if(index === -1){
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        this.students[index] = {
            ...this.students[index],
            ...data,
        }

        return this.students[index]
    }

    // PATCH
    patchStudent(id:number, data : Partial<{
        id:number;
        name:string;
        email:string;
        age:number;
    }>){
        const student = this.getStudentById(id);
        Object.assign(student,data);
        return student;
        
    }

    //DELETE
    deleteStudent(id:number){
        const index = this.students.findIndex((s)=>s.id===id);

        if(index === -1){
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        const deletedStudent=this.students.splice(index,1);
        return {message:`Student with id ${id} deleted, Student : ${deletedStudent}`};

    }
}
