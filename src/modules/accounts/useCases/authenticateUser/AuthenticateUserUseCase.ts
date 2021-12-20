import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
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

class AuthenticateUserUseCase {
    constructor(private usersRepository: IUsersRepository) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new Error("E-mail or password incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch)
            throw new Error("E-mail or password incorrect");

        const token = sign({}, "d5c6d7e0392032715f66cbd14e085594", {
            subject: user.id,
            expiresIn: "1d"
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