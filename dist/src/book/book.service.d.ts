import { CreateBookDto, GetBookDto } from './dto';
import { DbService } from 'src/db/db.service';
import { EditBookDto } from './dto/edit-book.dto';
export declare class BookService {
    private readonly prisma;
    constructor(prisma: DbService);
    searchBook(query: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        genre: string;
        publishedYear: number;
        isbn: string;
        stockCount: number;
        userId: string;
    }[]>;
    createBook(userId: string, dto: CreateBookDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        genre: string;
        publishedYear: number;
        isbn: string;
        stockCount: number;
        userId: string;
    }>;
    getBook(query: GetBookDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        genre: string;
        publishedYear: number;
        isbn: string;
        stockCount: number;
        userId: string;
    }[] | {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        books: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            author: string;
            genre: string;
            publishedYear: number;
            isbn: string;
            stockCount: number;
            userId: string;
        }[];
    }>;
    getBookById(bookId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        genre: string;
        publishedYear: number;
        isbn: string;
        stockCount: number;
        userId: string;
    }>;
    updateBookById(userId: string, bookId: string, dto: EditBookDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        genre: string;
        publishedYear: number;
        isbn: string;
        stockCount: number;
        userId: string;
    }>;
    deleteBookById(userId: string, bookId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        genre: string;
        publishedYear: number;
        isbn: string;
        stockCount: number;
        userId: string;
    }>;
}
