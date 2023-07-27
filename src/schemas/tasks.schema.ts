import { z } from "zod";
import { subTasksRequestSchema } from "./subtasks.schema";
import { categoriesRequestSchema } from "./categories.schema";
import { commentRequestSchema } from "./comments.schema";

export { taskRequestSchema, taskUpdateSchema };

const taskRequestSchema = z.object({
	title: z.string().max(100),
	description: z
		.string()
		.max(300)
		.nullable(),
	status: z.string().max(10),
	deadline: z.string(),
	subTasks: z.array(
		subTasksRequestSchema
	).nullable(),
	attachments: z.array(
		z.string()
	).nullable(),
	members: z.array(
		z.string()
	).nullable(),
	category: categoriesRequestSchema,
});

const taskUpdateSchema = taskRequestSchema.extend({comments: z.array(commentRequestSchema)})