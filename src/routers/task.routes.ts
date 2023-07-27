import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import { taskRequestSchema } from "../schemas/tasks.schema";
import ensureIsValidData from "../middlewares/ensureIsValidData.middleware";
import { createTaskController, listTasksController, retrieveTaskController, updateTaskController } from "../controllers/tasks/tasks.controllers";
import { ensureIsValidId } from "../middlewares/ensureIsValidId.middleware";
import { taskRepository } from "../repositories";

const TaskRoutes = Router();

TaskRoutes.post(
    "/",
    ensureAuthMiddleware,
    ensureIsValidData(taskRequestSchema),
    createTaskController
);

TaskRoutes.get("/",ensureAuthMiddleware, listTasksController);

TaskRoutes.get("/:id", ensureIsValidId(taskRepository), retrieveTaskController);

TaskRoutes.patch(
    "/:id",
    ensureAuthMiddleware,
    ensureIsValidId(taskRepository),
    updateTaskController
);

export default TaskRoutes;
