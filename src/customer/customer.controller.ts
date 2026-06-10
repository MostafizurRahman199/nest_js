import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor (private readonly customerService:CustomerService){}

    @Get()
    getAllCustomer(){
        return this.customerService.getAllCustomers();
    }

    @Post()
    createCustomer(@Body() createCustomerDto:CreateCustomerDto){
        return this.customerService.addCustomer(createCustomerDto)
    }
}
