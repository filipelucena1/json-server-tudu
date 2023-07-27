
import User from "../../entities/user.enttity";
import { userRepository } from "../../repositories";

const retrieveUserService = async (id: string): Promise<User> => {
	const user = await userRepository.findOne({
		where: { id },
		relations: {
			tasks: true,
			sharedTasks: true
		}
	});

	return user!;
};

export default retrieveUserService;
