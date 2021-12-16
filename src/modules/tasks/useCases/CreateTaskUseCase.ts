import { IUsersRepository } from "../../accounts/repositories/IUsersRepository";
import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

class CreateTaskUseCase {
    constructor(private tasksRepository: ITasksRepository, private usersRepository: IUsersRepository) {}

    async execute({name, description, user_id}: ICreateTaskDTO): Promise<Task> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            return null;
        }

        const task = await this.tasksRepository.create({name, description, user_id});
        return task;
    }
}

export { CreateTaskUseCase }