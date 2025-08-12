import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BookService } from './book.service';
import { GetUser } from 'src/auth/decorators';
import { CreateBookDto, GetBookDto } from './dto';


@UseGuards(AuthGuard)
@Controller('book')
export class BookController {

    constructor(private readonly bookService : BookService){}

    @Post()
    createBook(
        @GetUser('sub') userId : string,
        @Body() dto : CreateBookDto,
    ){
        return this.bookService.createBook(userId,dto)
    }

    @Get()
    getBook(@Query() query : GetBookDto){
        return this.bookService.getBook(query)
    }
}
