import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class EditBookDto {
    @ApiProperty({
        name: "title",
        description: "A book title",
        example: "Harry Potter"
    })
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({
        name: "author",
        description: "writer or author of book",
        example: "JK Rolling"
    })
    @IsString()
    @IsOptional()
    author?: string

    @ApiProperty({
        name: "genre",
        description: "a genre mean thrriller and love or mystic like type of book",
        example: "mystery"
    })
    @IsString()
    @IsOptional()
    genre?: string


    @ApiProperty({
        name: "publishedYear",
        description: "a published year of book when it pusblhised",
        example: "2014"
    })
    @IsNumber()
    @IsOptional()
    @Min(1000, { message: 'publishedYear must be a 4-digit year' })
    @Max(9999, { message: 'publishedYear must be a 4-digit year' })
    publishedYear?: number


    @ApiProperty({
        name: "isbn",
        description: "a unique identifier for all publishied books",
        example: "123456564"
    })
    @IsString()
    @IsOptional()
    isbn?: string



    @ApiProperty({
        name: "stockCount",
        description: "a stock count of book in library",
        example: "5"
    })
    @IsNumber()
    @IsOptional()
    stockCount?: number
}