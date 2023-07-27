import { z } from "zod";

export { commentRequestSchema };

const commentRequestSchema = z.object({
    content: z.string().max(300),
})
