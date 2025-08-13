"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const db_service_1 = require("../db/db.service");
const fuse_js_1 = __importDefault(require("fuse.js"));
let BookService = class BookService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchBook(query) {
        if (!query.trim())
            throw new common_1.BadRequestException('Query is required');
        try {
            const books = await this.prisma.book.findMany();
            const fuse = new fuse_js_1.default(books, {
                keys: ['title', 'author', 'genre'],
                threshold: 0.4,
                ignoreLocation: true,
            });
            const results = fuse.search(query);
            return results.map(result => result.item);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createBook(userId, dto) {
        try {
            const newBook = await this.prisma.book.create({
                data: {
                    userId,
                    ...dto,
                }
            });
            return newBook;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ConflictException("Book already exists with isbn number");
                }
            }
            throw error;
        }
    }
    async getBook(query) {
        try {
            let { limit, page } = query;
            if (!query.limit || !query.page) {
                return await this.prisma.book.findMany({
                    orderBy: {
                        createdAt: "desc"
                    }
                });
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
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBookById(bookId) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId
                }
            });
            if (!book) {
                throw new common_1.NotFoundException('Book does not exist');
            }
            return book;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateBookById(userId, bookId, dto) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId,
                }
            });
            if (!book || book.userId !== userId) {
                throw new common_1.ForbiddenException('Access to resource denied');
            }
            return await this.prisma.book.update({
                where: {
                    id: bookId,
                },
                data: {
                    ...dto,
                }
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteBookById(userId, bookId) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {
                    id: bookId,
                }
            });
            if (!book || book.userId !== userId) {
                throw new common_1.ForbiddenException('Access to resource denied');
            }
            return await this.prisma.book.delete({
                where: {
                    id: bookId,
                    userId,
                }
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], BookService);
//# sourceMappingURL=book.service.js.map