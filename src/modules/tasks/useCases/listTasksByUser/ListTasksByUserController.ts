import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTasksByUserUseCase } from "./ListTasksByUserUseCase";

class ListTasksByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.params;

        const listTasksByUserUseCase = container.resolve(ListTasksByUserUseCase);
        const tasks = await listTasksByUserUseCase.execute(user_id);

        return response.json(tasks);
    }
}

export { ListTasksByUserController }