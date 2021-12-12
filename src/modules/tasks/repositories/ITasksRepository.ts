import { Task } from "../entities/Task";
import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";

interface ITasksRepository {
    create(data: ICreateTaskDTO): Promise<Task>;
}

export { ITasksRepository }