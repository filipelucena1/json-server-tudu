import { z } from "zod";
import { userRequestSchema, userUpdateSchema, userWithoutPasswordSchema } from "../../schemas/users.schema";

export {
    IUserRequest,
    IUserUpdate,
    IUserWithoutPassword
};

type IUserRequest = z.infer<typeof userRequestSchema>;

type IUserUpdate = z.infer<typeof userUpdateSchema>;

type IUserWithoutPassword = z.infer<typeof userWithoutPasswordSchema>;
