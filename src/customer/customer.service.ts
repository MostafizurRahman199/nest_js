import { Injectable } from '@nestjs/common';
import { ICustomer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    private customers:ICustomer[] = [];

    getAllCustomers():ICustomer[]{
    return this.customers;
    }

    addCustomer(createCustomerDto:CreateCustomerDto):ICustomer{
        const newCustomer:ICustomer = {
            id:Date.now(),
            ...createCustomerDto,
        };

        this.customers.push(newCustomer);
        return newCustomer;
    }

}
