import { z } from "zod";

export { categoriesUpdateSchema, categoriesRequestSchema };

const categoriesRequestSchema = z.object({
	name: z
		.string()
		.max(70),
	color: z
		.string()
		.max(70),
});

const categoriesUpdateSchema = categoriesRequestSchema.partial();
