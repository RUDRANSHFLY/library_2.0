import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class GetBookDto{
    @ApiProperty({
        name : "page",
        description : "deafult page is 1",
        example : "4"
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @Min(1)
    page? : number = 1

    @ApiProperty({
        name : 'limit',
        description : "an limit for reterval of books",
        example : "15"
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @Min(1)
    limit? : number = 10
}