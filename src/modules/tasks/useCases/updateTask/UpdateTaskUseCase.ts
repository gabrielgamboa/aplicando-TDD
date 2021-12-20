import { inject, injectable } from "tsyringe";
import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

@injectable()
class UpdateTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: ITasksRepository
    ) {}

    async execute(task_id: string): Promise<Task> {
        const taskExists = await this.tasksRepository.findById(task_id);

        if (!taskExists)
            throw new Error("Task not exists");

        const updatedTask = await this.tasksRepository.updateTask(taskExists);

        return updatedTask;
    }
}

export { UpdateTaskUseCase }