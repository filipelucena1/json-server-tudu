import { z } from "zod";
import { subTasksRequestSchema, subTasksUpdateSchema } from "../../schemas/subtasks.schema";

export { ISubTaskRequest, ISubTaskUpdate};

type ISubTaskRequest = z.infer<typeof subTasksRequestSchema>;

type ISubTaskUpdate = z.infer<typeof subTasksUpdateSchema>;
