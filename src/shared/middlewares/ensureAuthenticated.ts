import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new Error("Token is missing");
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: user_id } = verify(token, "d5c6d7e0392032715f66cbd14e085594") as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new Error("User does not exists");
        }

        request.user = { id: user_id };

        return next();

    } catch (error) {
        throw new Error("Invalid token");
    }
}