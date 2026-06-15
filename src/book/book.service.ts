import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookDocument } from './model/book.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private readonly bookModel:Model<BookDocument>,
    ){}




     async createBook(
        input:CreateBookDto
     ):Promise<BookDocument>{
        const newBook = new this.bookModel(input);
        return newBook.save();
     }

     async findAll():Promise<BookDocument[]>{
        return this.bookModel.find().exec();
     }




     async findById(id:string):Promise<BookDocument|null>{
       
        if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid book ID');
      }
      const book = await this.bookModel.findById(id).exec();
      if(!book){
        throw new NotFoundException('Book not found');
      }
      return book;
     }




     async updateBook(id:string,input:CreateBookDto):Promise<BookDocument|null>{
       const book = await this.bookModel.findByIdAndUpdate(id,input,{new:true}).exec();
       if(!book){
        throw new NotFoundException('Book not found');
       }
       return book;
     }



     async deleteBook(id:string):Promise<BookDocument|null>{
        const book = await this.bookModel.findByIdAndDelete(id).exec();
        if(!book){
          throw new NotFoundException('Book not found');
        }
        return book;
     }

     
}
