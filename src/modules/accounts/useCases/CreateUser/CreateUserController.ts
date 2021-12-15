import { Request, Response } from "express";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

import { CreateUserUseCase} from "../CreateUser/CreateUserUseCase";

class CreateUserController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserUseCase = new CreateUserUseCase(new UsersRepository());
        const user = await createUserUseCase.execute({ name, email, password });

        return response.json(user);
    }
}

export { CreateUserController }