import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/CreateTaskController";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();

tasksRoutes.post("/", createTaskController.handle);

export { tasksRoutes }