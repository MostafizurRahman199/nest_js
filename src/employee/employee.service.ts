import { Injectable } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectModel(Employee.name)
        private readonly employeeModel:Model<Employee>,

        @InjectModel(Profile.name)
        private readonly profileModel:Model<Profile>,
    ){}


    async getEmployees(name?: string, salary?: number): Promise<Employee[]> {
       
        let profileIds: any[] = [];
        let isNameSearched = false;

        if (name) {
            isNameSearched = true;
            const profiles = await this.profileModel.find(
                { Name: { $regex: name, $options: 'i' } }).exec();
            profileIds = profiles.map(p => p._id);
        }

        const employeeQuery: any = {};
        if (isNameSearched) {
            employeeQuery.profile = { $in: profileIds };
        }
        if (salary) {
            employeeQuery.salary = Number(salary);
        }

        return this.employeeModel.find(employeeQuery).populate('profile').exec();
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const { Name, phone, address, gender, age, status, ...employeeData } = createEmployeeDto;

        // Step 1: Create and save the Profile
        const newProfile = await this.profileModel.create({
            Name,
            phone,
            address,
            gender,
            age,
            status,
        });

        // Step 2: Create and save the Employee linked to the Profile
        const newEmployee = await this.employeeModel.create({
            ...employeeData,
            profile: newProfile._id,
        });

        return newEmployee;
    }
}
