import { Router } from "express";

import { userRequestSchema } from "../schemas/users.schema";
import ensureIsValidData from "../middlewares/ensureIsValidData.middleware";
import { createUserController } from "../controllers/users/users.controllers";
import { createSessionController, profileUserController } from "../controllers/session/session.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const sessionRoutes = Router();

sessionRoutes.post(
    "/register",
    ensureIsValidData(userRequestSchema),
    createUserController
);

sessionRoutes.post(
	"/login",
	createSessionController
);

sessionRoutes.get(
	"/profile",
	ensureAuthMiddleware,
	profileUserController
);

export default sessionRoutes;
