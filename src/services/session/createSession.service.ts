import "dotenv/config";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { ILogin, IloginResponse } from "../../interfaces/session";
import { userRepository } from "../../repositories";
import { AppError } from "../../errors";

const createSessionService = async ({
	email,
	password
}: ILogin): Promise<IloginResponse> => {
	const searchUser = await userRepository.findOne({
		where: { email },
		select: {
			id: true,
			email: true,
			password: true,
		}
	});

	if (!searchUser) {
		throw new AppError("Invalid user or password!", 403);
	}

	const passwordMatch = await compare(password, searchUser.password);

	if (!passwordMatch) {
		throw new AppError("Invalid user or password!", 403);
	}

	const token = jwt.sign(
		{},
		process.env.SECRET_KEY!,
		{
			subject: searchUser.id,
			expiresIn: "24h"
		}
	);

	return {
		token,
		id: searchUser.id
	};
};

export default createSessionService;
