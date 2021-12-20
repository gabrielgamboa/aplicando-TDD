import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/CreateTaskController";
import { ListTasksByUserController } from "../modules/tasks/useCases/listTasksByUser/ListTasksByUserController";
import { UpdateTaskController } from "../modules/tasks/useCases/updateTask/UpdateTaskController";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const listTasksByUserController = new ListTasksByUserController();

tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.patch("/:id", updateTaskController.handle);
tasksRoutes.get("/user/:id", listTasksByUserController.handle);

export { tasksRoutes }