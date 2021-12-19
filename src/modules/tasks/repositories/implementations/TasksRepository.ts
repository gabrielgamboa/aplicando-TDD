import { getRepository, Repository } from "typeorm";

import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { ITasksRepository } from "../ITasksRepository";
import { Task } from "../../entities/Task";

class TasksRepository implements ITasksRepository {
    private repository: Repository<Task>;

    constructor() {
        this.repository = getRepository(Task);
    }
    
    async create({ name, description, user_id}: ICreateTaskDTO): Promise<Task> {
        
    }
}

export { TasksRepository }