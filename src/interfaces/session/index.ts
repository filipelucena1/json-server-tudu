import { z } from "zod";
import sessionSchema from "../../schemas/session.schema";

export { ILogin, IloginResponse };

type ILogin = z.infer<typeof sessionSchema>;

interface IloginResponse {
	token: string;
	id: string;
}
