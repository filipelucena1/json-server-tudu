import { Request, Response } from "express";

import createTaskService from "../../services/tasks/createTask.service";
import retrieveTaskService from "../../services/tasks/retrieveTask.service";
import deleteTaskService from "../../services/tasks/deleteTask.service";
import updateTaskService from "../../services/tasks/updateTask.service";
import ListAllTasksService from "../../services/tasks/listTasks.service";

const createTaskController = async (req: Request, res: Response) => {
    const body = req.body;
    const userId: string = req.user.id;
    const newTask = await createTaskService(body, userId);
    return res.status(201).json(newTask);
};

const listTasksController = async (req: Request, res: Response) => {
    const userId: string = req.user.id;
    const tasks = await ListAllTasksService(userId);
    return res.status(200).json(tasks);
};

const retrieveTaskController = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const task = await retrieveTaskService(taskId);
    return res.status(200).json(task);
};

const updateTaskController = async (req: Request, res: Response) => {
    const body = req.body;
    const userId = req.user.id;
    const taskId: string = req.params.id;
    const task = await updateTaskService(body, taskId, userId);
    return res.status(200).json(task);
};

const deleteTaskController = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const status = await deleteTaskService(taskId);
    return res.status(status).json();
};

export {
    listTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    retrieveTaskController,
};
