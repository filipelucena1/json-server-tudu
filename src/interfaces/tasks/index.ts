import { z } from "zod";
import { taskRequestSchema, taskUpdateSchema } from "../../schemas/tasks.schema";

export { ITaskRequest, ITaskUpdate};

type ITaskRequest = z.infer<typeof taskRequestSchema>;

type ITaskUpdate = z.infer<typeof taskUpdateSchema>;
