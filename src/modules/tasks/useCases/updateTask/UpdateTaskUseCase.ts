import { Task } from "../../entities/Task";
import { ITasksRepository } from "../../repositories/ITasksRepository";

class UpdateTaskUseCase {
    constructor(private tasksRepository: ITasksRepository) { }

    async execute(task: Task): Promise<Task> {
        const taskExists = await this.tasksRepository.findById(task.id);

        if (!taskExists)
            throw new Error("Task not exists");

        const updatedTask = await this.tasksRepository.updateTask(task);

        return updatedTask;
    }
}

export { UpdateTaskUseCase }