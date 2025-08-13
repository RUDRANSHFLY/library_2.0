"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const db_service_1 = require("../db/db.service");
const client_1 = require("@prisma/client");
const argon2 = __importStar(require("argon2"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwt;
    config;
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        try {
            const password = await argon2.hash(dto.password);
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
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ConflictException("Account already exists with provided email");
                }
            }
            throw error;
        }
    }
    async signIn(dto) {
        try {
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
                throw new common_1.ForbiddenException("email doesn't exist");
            }
            const passwordMatches = await argon2.verify(user.password, dto.password);
            if (!passwordMatches) {
                throw new common_1.ForbiddenException("Credentials Invalid");
            }
            const { access_token } = await this.signToken(user.id, user.email);
            const { password, ...safeUser } = user;
            const authUser = {
                ...safeUser,
                access_token,
            };
            return authUser;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const token = await this.jwt.signAsync(payload, {
            secret: this.config.get("JWT_SECRET")
        });
        return {
            access_token: token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map