import { Router } from "express";
import { deleteUserController, retrieveUserController, updateUserController } from "../controllers/users/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import { ensureIsValidId } from "../middlewares/ensureIsValidId.middleware";
import { userRepository } from "../repositories";

const userRoutes = Router();

userRoutes.get(
    "/:id",
    ensureAuthMiddleware,
    ensureIsValidId(userRepository),
    retrieveUserController
);

userRoutes.patch(
    "/:id",
    ensureAuthMiddleware,
    ensureIsValidId(userRepository),
    updateUserController
);

userRoutes.delete(
    "/:id",
    ensureAuthMiddleware,
    ensureIsValidId(userRepository),
    deleteUserController
);

export default userRoutes;
