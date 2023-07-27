import { Request, Response } from "express";
import createSessionService from "../../services/session/createSession.service";
import profileUserService from "../../services/session/profileUser.service";

const createSessionController = async (req: Request, res: Response) => {
	const data = await createSessionService(req.body);

	return res.json(data);
};

const profileUserController = async (req: Request, res: Response) => {
	const userId = req.user.id;
	const profileUser = await profileUserService(userId);

	return res.json(profileUser);
};

export { createSessionController, profileUserController };
