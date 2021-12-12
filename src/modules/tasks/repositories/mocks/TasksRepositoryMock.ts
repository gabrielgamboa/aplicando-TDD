import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../../entities/Task";
import { ITasksRepository } from "../ITasksRepository";

class TasksRepositoryMock implements ITasksRepository {
    tasks: Task[] = []

    async create({name, description, user_id}: ICreateTaskDTO): Promise<Task> {
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