import { User } from "@prisma/client";
export interface AuthUser extends Omit<User, "firstName" | "lastName" | "password"> {
    access_token: string;
}
export interface TokenUser {
    sub: string;
    email: string;
    iat: number;
    exp: number;
}
