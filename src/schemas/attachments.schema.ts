import { z } from "zod";

export { attachmentRequestSchema, attachmentUpdateSchema };

const attachmentRequestSchema = z.object({
	currentUrl: z.string(),
});

const attachmentUpdateSchema = attachmentRequestSchema.partial();
