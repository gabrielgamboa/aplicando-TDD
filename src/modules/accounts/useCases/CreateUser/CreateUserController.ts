import { Request, Response } from "express";

import { CreateUserUseCase} from "../CreateUser/CreateUserUseCase";

class CreateUserController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        return response.json({});
    }
}

export { CreateUserController }