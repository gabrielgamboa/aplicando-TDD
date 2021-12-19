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
}

export { TasksRepository }