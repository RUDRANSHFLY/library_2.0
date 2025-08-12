import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { User } from "@prisma/client";
import { AuthUser } from 'types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('signup')
    signUp(@Body() dto : AuthDto) : Promise<(Omit<User,"password">) | null> {
        return this.authService.signup(dto)
    }

    
    @Post('signin')
    signIn(@Body() dto : AuthDto) : Promise<AuthUser>{
        return this.authService.signIn(dto)
    }
}
