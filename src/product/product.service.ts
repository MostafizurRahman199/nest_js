import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        {
            id:1,
            name:"Mobile",
            price:2000

        },
        {
            id:2,
            name:"Laptop",
            price:200000
        },
        {
            id:3,
            name:"Car",
            price:2000000
        }
    ];

    getAllProducts(){
        return this.products;
    }
    getProductById(id:number){
        return this.products.find((product)=>product.id===id)
    }
}
