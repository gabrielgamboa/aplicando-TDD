import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
}

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new Error("E-mail or password incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch)
            throw new Error("E-mail or password incorrect");

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token,
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }