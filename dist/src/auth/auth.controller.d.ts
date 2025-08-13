import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { User } from "@prisma/client";
import { AuthUser } from 'types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(dto: AuthDto): Promise<(Omit<User, "password">) | null>;
    signIn(dto: AuthDto): Promise<AuthUser>;
}
