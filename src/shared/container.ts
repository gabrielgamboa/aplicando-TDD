import { container } from "tsyringe";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../modules/accounts/repositories/IUsersRepository";
import { TasksRepository } from "../modules/tasks/repositories/implementations/TasksRepository";
import { ITasksRepository } from "../modules/tasks/repositories/ITasksRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ITasksRepository>(
    "TasksRepository",
    TasksRepository
);

