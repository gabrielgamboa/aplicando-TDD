import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTasksByUserUseCase } from "./ListTasksByUserUseCase";

class ListTasksByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = "2cf09da7-08e7-4525-8f03-4aee5774b200";

        const listTasksByUserUseCase = container.resolve(ListTasksByUserUseCase);
        const tasks = await listTasksByUserUseCase.execute(user_id);

        return response.json(tasks);
    }
}

export { ListTasksByUserController }