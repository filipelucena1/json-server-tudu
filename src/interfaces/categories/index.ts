import { z } from "zod";
import { categoriesRequestSchema, categoriesUpdateSchema } from "../../schemas/categories.schema";

export { ICategoriesRequest, ICategoriesUpdate };

type ICategoriesRequest = z.infer<typeof categoriesRequestSchema>;

type ICategoriesUpdate = z.infer<typeof categoriesUpdateSchema>;
