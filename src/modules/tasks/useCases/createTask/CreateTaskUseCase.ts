import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: ITasksRepository,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({name, description, user_id}: ICreateTaskDTO): Promise<Task> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found");
        }

        const task = await this.tasksRepository.create({name, description, user_id});
        return task;
    }
}

export { CreateTaskUseCase }