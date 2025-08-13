import { ConfigService } from '@nestjs/config';
import { DbService } from 'src/db/db.service';
import { AuthDto } from './dto';
import { User } from '@prisma/client';
import { AuthUser } from 'types';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: DbService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<(Omit<User, "password">) | null>;
    signIn(dto: AuthDto): Promise<AuthUser>;
    signToken(userId: string, email: string): Promise<{
        access_token: string;
    }>;
}
