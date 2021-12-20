import { Task } from "../entities/Task";
import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";

interface ITasksRepository {
    create(data: ICreateTaskDTO): Promise<Task>;
    findByUser(user_id: string): Promise<Task[]>;
}

export { ITasksRepository }