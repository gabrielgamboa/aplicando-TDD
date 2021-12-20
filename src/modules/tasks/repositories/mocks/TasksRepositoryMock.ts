import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../../entities/Task";
import { ITasksRepository } from "../ITasksRepository";

class TasksRepositoryMock implements ITasksRepository {
    tasks: Task[] = []

    async create({name, description, user_id}: ICreateTaskDTO): Promise<Task> {
        const task = new Task();

        Object.assign(task, {
            name,
            description,
            user_id
        });

        this.tasks.push(task);
        return task;
    }

    async findByUser(user_id: string): Promise<Task[]> {
        return await this.tasks.filter(task => task.user_id === user_id);
    }

    async findById(task_id: string): Promise<Task> {
        return await this.tasks.find(task => task.id === task_id);
    }

    async updateTask(task: Task): Promise<Task> {
        task.done = true;
        return task;
    }
}

export { TasksRepositoryMock }