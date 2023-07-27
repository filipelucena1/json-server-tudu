import { AppError } from "../../errors";
import { IUserRequest, IUserWithoutPassword } from "../../interfaces/users";
import { userRepository } from "../../repositories";

const updateUserService = async (
    data: IUserRequest,
    uuid: string
): Promise<IUserWithoutPassword | null> => {

    try {
        await userRepository.update({ id: uuid }, data);
    } catch (error: any) {
        throw new AppError(error.detail, 409);
    }

    const findUser = await userRepository.findOneBy({ id: uuid });
    const {password, ...userWithoutPassword} = findUser!
    
    return userWithoutPassword;
};

export default updateUserService;
