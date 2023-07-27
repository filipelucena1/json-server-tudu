import { z } from "zod";
import { commentRequestSchema } from "../../schemas/comments.schema";

export { ICommentReq };

type ICommentReq = z.infer<typeof commentRequestSchema>;
