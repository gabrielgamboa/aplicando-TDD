import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

class CreateTaskUseCase {
    constructor(private tasksRepository: ITasksRepository) {}

    async execute({name, description, user_id}: ICreateTaskDTO): Promise<Task> {
        const task = await this.tasksRepository.create({name, description, user_id});
        return task;
    }
}

export { CreateTaskUseCase }