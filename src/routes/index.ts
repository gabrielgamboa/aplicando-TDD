import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { tasksRoutes } from "./tasks.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/tasks", tasksRoutes);

export { routes }