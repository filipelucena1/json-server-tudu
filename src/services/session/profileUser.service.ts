import User from "../../entities/user.enttity";
import { userRepository } from "../../repositories";

const profileUserService = async (id: string): Promise<User> => {
	const user = await userRepository.findOne({
		where: {
			id
		}
	});

	return user!;
};

export default profileUserService;
