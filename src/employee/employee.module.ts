import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { Employee, EmployeeSchema } from './schemas/employee.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Profile.name, schema:ProfileSchema}]),
    MongooseModule.forFeature([{name:Employee.name, schema:EmployeeSchema}])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {
    
}
