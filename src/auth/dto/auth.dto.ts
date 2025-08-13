import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({
        name : "email",
        description : "the email address of the user",
        example : "test@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email! : string;

    @ApiProperty({
        description : "The user's password",
        example : "SecurePassword123#",
        minLength : 8
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password! : string;
}