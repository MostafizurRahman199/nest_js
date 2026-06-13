import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
    
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    async getEmployee() {
        const employees = await this.employeeService.getEmployees();
        return {
            statusCode: HttpStatus.OK,
            message: 'Employees fetched successfully',
            data: employees,
        };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        const employee = await this.employeeService.createEmployee(createEmployeeDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Employee created successfully',
            data: employee,
        };
    }
}
