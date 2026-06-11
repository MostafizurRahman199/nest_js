import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception')
export class ExceptionController {
    @UseFilters(HttpExceptionFilter)
    @Get('hello/:id')
    getHello(@Param('id', ParseIntPipe)id:number){
        return {message:"Your id is: "+id}
    }

}
