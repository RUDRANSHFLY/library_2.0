import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'src/db/db.service';
import { AuthDto } from './dto';
import { Prisma, User } from '@prisma/client';
import * as argon2 from "argon2"
import { AuthUser } from 'types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: DbService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService
    ) { }

    async signup(dto: AuthDto): Promise<(Omit<User, "password">) | null> {
        try {
            // hash the password
            const password = await argon2.hash(dto.password)

            // save the new user
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: password,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    firstName: true,
                    lastName: true,
                }
            });

            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ConflictException("Account already exists with provided email")
                }
            }

            throw error
        }
    }

    async signIn(dto: AuthDto): Promise<AuthUser> {
        try {

            //? check first user exists or not
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                },
                select: {
                    password: true,
                    id: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            if (!user) {
                throw new ForbiddenException("email doesn't exist")
            }

            const passwordMatches = await argon2.verify(user.password, dto.password)

            if (!passwordMatches) {
                throw new ForbiddenException("Credentials Invalid")
            }

            const {access_token} = await this.signToken(user.id, user.email)

            const { password ,...safeUser} = user
            

            const authUser: AuthUser = {
                ...safeUser,
                access_token,
            }

            return authUser;
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        }

        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get("JWT_SECRET")
        });

        return {
            access_token: token,
        }
    }
}
