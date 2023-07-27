import { AppError } from "../../errors";
import { IUserRequest, IUserWithoutPassword } from "../../interfaces/users";
import { userRepository } from "../../repositories";

const createUserService = async (
    userData: IUserRequest
): Promise<IUserWithoutPassword> => {

    try {
        const createdUser = userRepository.create({
            ...userData,
        });
        await userRepository.save(createdUser);

        const { password, ...userWithoutPassword } = createdUser;
        return userWithoutPassword;

    } catch (error: any) {
        throw new AppError(error.detail, 409);
    }
};

export default createUserService;
