import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/CreateTaskController";
import { ListTasksByUserController } from "../modules/tasks/useCases/listTasksByUser/ListTasksByUserController";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const listTasksByUserController = new ListTasksByUserController();

tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.get("/user", listTasksByUserController.handle);

export { tasksRoutes }