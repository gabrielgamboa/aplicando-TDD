import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: user_id } = verify(token, "d5c6d7e0392032715f66cbd14e085594") as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists", 401);
        }

        request.user = { id: user.id };

        return next();

    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}