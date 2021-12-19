import { Request, Response } from "express";

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, user_id } = request.body;
        
        return response.status(201).send();
    }
}

export { CreateTaskController }