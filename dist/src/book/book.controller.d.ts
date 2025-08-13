import { BookService } from './book.service';
import { CreateBookDto, EditBookDto, GetBookDto } from './dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    searchBook(q: string): Promise<{
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
    updateBookById(bookId: string, userId: string, dto: EditBookDto): Promise<{
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
    deleteBookById(bookId: string, userId: string): Promise<{
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
