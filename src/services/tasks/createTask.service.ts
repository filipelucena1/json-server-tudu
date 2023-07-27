import Category from "../../entities/category.entity";
import Task from "../../entities/task.entity";
import User from "../../entities/user.enttity";
import { AppError } from "../../errors";
import { ICategoriesRequest } from "../../interfaces/categories";
import { ITaskRequest } from "../../interfaces/tasks";
import { attachmentRepository, categoryRepository, subTaskRepository, taskRepository, userRepository } from "../../repositories";

const createCategory = async (category: ICategoriesRequest): Promise<Category> => {
    const searchCategory = await categoryRepository.findOneBy({name: category.name});
    if(searchCategory){
        return searchCategory
    }
    const newCategory = categoryRepository.create(category);
    await categoryRepository.save(newCategory);
    return newCategory;
}

const createTaskService = async (body: ITaskRequest, userId: string): Promise<Task> => {
    const user = await userRepository.findOneBy({ id: userId });
    const { subTasks, attachments, category, members, description, ...taskData } = body;
    const membersArray: User[] = []
    members?.forEach(async (member) => {
        const searchUserByEmail = await userRepository.findOneBy({email: member})
        if(!searchUserByEmail){
            throw new AppError(`Email <${member}> was not found`, 404);
        }
        if(searchUserByEmail.id !== user?.id){
            membersArray.push(searchUserByEmail!)
        }
    })

    const newTask = taskRepository.create({
        ...taskData,
        description: description? description : "",
        category: await createCategory(category),
        user: user!,
        subTasks: [],
        members: membersArray,
        attachments: [],
    })

    subTasks?.forEach((sub) => {
        const createSubTask = subTaskRepository.create(sub)
        newTask.subTasks.push(createSubTask)
    })

    attachments?.forEach((attachment) => {
        const createAttachment = attachmentRepository.create({currentUrl: attachment})
        newTask.attachments.push(createAttachment)
    })

    await taskRepository.save(newTask)

    newTask.members.forEach(async (member) => {
        const currentUser = await userRepository.findOne({
            where: {id: member.id},
            relations: {sharedTasks: true}
        })
        currentUser!.sharedTasks.push(newTask)
        await userRepository.save(currentUser!)
    })

    return newTask!;
};

export default createTaskService;
