import { Task } from "../../entities/Task";
import { ITasksRepository } from "../ITasksRepository";

class TasksRepositoryMock implements ITasksRepository {
    tasks: Task[] = []

    async create(name: string, description: string, user_id: string): Promise<Task> {
        const task = new Task();

        Object.assign(task, {
            name,
            description
        });

        this.tasks.push(task);

        return task;
    }
}

export { TasksRepositoryMock }