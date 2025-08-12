import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";


export class EditBookDto{
    @IsString()
    @IsOptional()
    title! : string

    @IsString()
    @IsOptional()
    author! : string

    @IsString()
    @IsOptional()
    genre! : string

    @IsNumber()
    @IsOptional()
    @Min(1000, { message : 'publishedYear must be a 4-digit year'})
    @Max(9999, { message : 'publishedYear must be a 4-digit year'})
    publishedYear! : number

    @IsString()
    @IsOptional()
    isbn! : string
    
    @IsNumber()
    @IsOptional()
    stockCount? : number
}