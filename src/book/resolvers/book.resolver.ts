import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../model/book.model';
import { CreateBookDto } from '../dto/create-book.dto';

@Resolver(()=>Book)
export class BookResolver {

    constructor(private readonly bookService:BookService){}


    @Query(()=>Book, {nullable:true, name:'getBookById'})
    async getBookById(
        @Args('id',{type:()=>String}) id:string):Promise<Book|null>{
        return this.bookService.findById(id);
    }


    
    @Query(()=>[Book], {name:'getAllBooks'})
    async getAllBooks():Promise<Book[]>{
        return this.bookService.findAll();
    }



    @Mutation(()=>Book, {name:'createBook'})
    async createBook(@Args('input') input:CreateBookDto):Promise<Book>{
        return this.bookService.createBook(input);
    }



    @Mutation(()=>Book, {name:'updateBook'})
    async updateBook(
        @Args('id',{type:()=>String}) id:string,
        @Args('input') input:CreateBookDto):Promise<Book|null>{
        return this.bookService.updateBook(id,input);
    }


    @Mutation(()=>Book, {name:'deleteBook'})
    async deleteBook(
        @Args('id',{type:()=>String}) id:string):Promise<Book|null>{
        return this.bookService.deleteBook(id);
    }

}
