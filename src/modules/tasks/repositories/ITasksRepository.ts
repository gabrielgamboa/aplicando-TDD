import { Task } from "../entities/Task";
import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";

interface ITasksRepository {
    create(data: ICreateTaskDTO): Promise<Task>;
    findByUser(user_id: string): Promise<Task[]>;
    findById(task_id: string): Promise<Task>;
    updateTask(task: Task): Promise<Task>;
}

export { ITasksRepository }