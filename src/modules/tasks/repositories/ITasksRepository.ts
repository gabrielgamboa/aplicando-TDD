import { Task } from "../entities/Task";

interface ITasksRepository {
    create(name: string, description: string, user_id: string): Promise<Task>;
}

export { ITasksRepository }