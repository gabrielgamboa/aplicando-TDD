import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/CreateTaskController";
import { ListTasksByUserController } from "../modules/tasks/useCases/listTasksByUser/ListTasksByUserController";
import { UpdateTaskController } from "../modules/tasks/useCases/updateTask/UpdateTaskController";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const updateTaskController = new UpdateTaskController();
const listTasksByUserController = new ListTasksByUserController();

tasksRoutes.post("/", ensureAuthenticated, createTaskController.handle);
tasksRoutes.patch("/:id", ensureAuthenticated, updateTaskController.handle);
tasksRoutes.get("/user", ensureAuthenticated, listTasksByUserController.handle);

export { tasksRoutes }