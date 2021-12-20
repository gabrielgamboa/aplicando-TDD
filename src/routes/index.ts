import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { tasksRoutes } from "./tasks.routes";
import { authenticateRoutes } from "./authenticate.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/tasks", tasksRoutes);
router.use(authenticateRoutes);

export { routes }