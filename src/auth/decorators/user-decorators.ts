import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenUser } from "types";
import { Request } from "express";

export const GetUser = createParamDecorator((data : string | undefined , ctx : ExecutionContext) : unknown => {

    const request = ctx.switchToHttp().getRequest<Request & {user : TokenUser}>();

    const user = request.user as TokenUser | undefined;

    if(!user){
        throw new Error('User not found in the request')
    }

    return data ? user[data] : user

})