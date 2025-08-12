import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";


export class CreateBookDto{
    @IsString()
    @IsNotEmpty()
    title! : string

    @IsString()
    @IsNotEmpty()
    author! : string

    @IsString()
    @IsNotEmpty()
    genre! : string

    @IsNumber()
    @IsNotEmpty()
    @Min(1000, { message : 'publishedYear must be a 4-digit year'})
    @Max(9999, { message : 'publishedYear must be a 4-digit year'})
    publishedYear! : number

    @IsString()
    @IsNotEmpty()
    isbn! : string
    
    @IsNumber()
    @IsOptional()
    stockCount? : number
}