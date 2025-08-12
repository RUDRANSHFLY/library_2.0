import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookDto, GetBookDto } from './dto';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class BookService {
    constructor(
        private readonly prisma: DbService
    ) { }

    
    async createBook(userId: string, dto: CreateBookDto) {
        try {
            const newBook = await this.prisma.book.create({
                data: {
                    userId,
                    ...dto,
                }
            })

            return newBook;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ConflictException("Book already exists with isbn number")
                }
            }

            throw error
        }
    }


    async getBook(query: GetBookDto) {
        try {
            let { limit , page } = query;

            //? if no pagination or query specified then return all books
            if(!('page' in query) || !('limit' in query)){
                return await this.prisma.book.findMany({
                    orderBy : {
                        createdAt : "desc"
                    }
                })
            }

            limit = limit ?? 10;
            page = page ?? 1;


            const skip = (page - 1) * limit;

            const [books, total] = await Promise.all([
                this.prisma.book.findMany({
                    skip,
                    take : limit,
                    orderBy : {
                        createdAt : "desc"
                    }
                }),
                this.prisma.book.count()
            ]);

            return {
                total,
                page,
                limit,
                totalPages : Math.ceil(total/limit),
                books
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}
