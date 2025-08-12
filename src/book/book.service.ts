import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookDto, GetBookDto } from './dto';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { EditBookDto } from './dto/edit-book.dto';

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
            let { limit, page } = query;

            //? if no pagination or query specified then return all books
            if (!query.limit || !query.page) {
                return await this.prisma.book.findMany({
                    orderBy: {
                        createdAt: "desc"
                    }
                })
            }

            limit = limit ?? 10;
            page = page ?? 1;


            const skip = (page - 1) * limit;

            const [books, total] = await Promise.all([
                this.prisma.book.findMany({
                    skip,
                    take: limit,
                    orderBy: {
                        createdAt: "desc"
                    }
                }),
                this.prisma.book.count()
            ]);

            return {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                books
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async getBookById(bookId: string) {
        try {
            return this.prisma.book.findUnique({
                where: {
                    id: bookId
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateBookById(userId: string, bookId: string, dto: EditBookDto) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId,
                }
            })

            //! User have created book have privaleged to edit the book
            if (!book || book.userId !== userId) {
                throw new ForbiddenException('Access to resource denied')
            }

            return await this.prisma.book.update({
                where: {
                    id: bookId,
                },
                data: {
                    ...dto,
                }
            })
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async deleteBookById(userId: string, bookId: string) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId,
                }
            })

            //! User have created book have privaleged to delete the book
            if (!book || book.userId !== userId) {
                throw new ForbiddenException('Access to resource denied')
            }

            return await this.prisma.book.delete({
                where: {
                    id: bookId,
                    userId,
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
