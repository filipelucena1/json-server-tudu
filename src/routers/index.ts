import { Router } from "express";

import TaskRoutes from "./task.routes";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";

const routes = Router();

routes.use("/", sessionRoutes);
routes.use("/tasks", TaskRoutes);
routes.use("/users", userRoutes);

export { routes };
