import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BookService } from './book.service';
import { GetUser } from 'src/auth/decorators';
import { CreateBookDto, EditBookDto, GetBookDto } from './dto';



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

    @Get(':id')
    getBookById(
        @Param('id') bookId : string,
    ){
        return this.bookService.getBookById(bookId)
    }

    @Patch(':id')
    updateBookById(
        @Param('id') bookId : string,
        @GetUser('sub') userId : string,
        @Body() dto : EditBookDto,
    ){
        return this.bookService.updateBookById(userId,bookId,dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookById(
        @Param('id') bookId : string,
        @GetUser('sub') userId : string,
    ){
        return this.bookService.deleteBookById(userId,bookId)
    }
}
