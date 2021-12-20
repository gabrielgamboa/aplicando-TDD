import { getRepository, Repository } from "typeorm";

import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { ITasksRepository } from "../ITasksRepository";
import { Task } from "../../entities/Task";

class TasksRepository implements ITasksRepository {
    private repository: Repository<Task>;

    constructor() {
        this.repository = getRepository(Task);
    }
    
    async create({ name, description, user_id }: ICreateTaskDTO): Promise<Task> {
        const task = this.repository.create({
            name,
            description,
            user_id
        });

        await this.repository.save(task);

        return task;
    }

    async findByUser(user_id: string): Promise<Task[]> {
        const tasks = await this.repository.createQueryBuilder("tasks")
            .select(["tasks.id", "tasks.name", "tasks.description", "tasks.done"])
            .where("tasks.user_id = :id", { id: user_id })
            .getMany();

        return tasks;
    }

    async findById(task_id: string): Promise<Task> {
        return await this.repository.findOne({ id: task_id});
    }

    async updateTask(task: Task): Promise<Task> {
        const taskToUpdate = await this.repository.findOne({ id: task.id });
        taskToUpdate.done = true;
        const updatedTask = await this.repository.save(taskToUpdate);

        return updatedTask;

    }
}

export { TasksRepository }