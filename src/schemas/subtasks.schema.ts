import { z } from "zod";

export { subTasksUpdateSchema, subTasksRequestSchema };

const subTasksRequestSchema = z.object({
	name: z.string().max(70),
	completed: z.boolean(),
});
const subTasksUpdateSchema = subTasksRequestSchema.partial();
