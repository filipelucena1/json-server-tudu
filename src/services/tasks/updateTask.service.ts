import User from "../../entities/user.enttity";
import { AppError } from "../../errors";
import { ITaskUpdate } from "../../interfaces/tasks";
import { attachmentRepository, categoryRepository, subTaskRepository, taskRepository, userRepository } from "../../repositories";

const updateTaskService = async (
  data: ITaskUpdate,
  taskId: string,
  userId: string
): Promise<any> => {
    const task = await taskRepository.findOne({
        where: {id: taskId},
        relations: {
          attachments: true,
          category: true,
          comments: true,
          members: true,
          subTasks: true,
          user: true
        }
    })

    if (task!.user.id !== userId) {
      throw new AppError("missing permissions", 401);
    }

    const membersArray: User[] = []
    data.members?.forEach(async (member) => {
        const searchUserByEmail = await userRepository.findOneBy({email: member})
        if(!searchUserByEmail){
            throw new AppError(`Email <${member}> was not found`, 404);
        }
        if(searchUserByEmail.id !== userId){
            membersArray.push(searchUserByEmail!)
        }
    })

    data.subTasks?.forEach(async (sub) => {
      const searchSubTask = await subTaskRepository.findOneBy({name: sub.name})
      if(!searchSubTask){
        const createSubTask = subTaskRepository.create(sub)
        task!.subTasks.push(createSubTask)
      }else{
        await subTaskRepository.update({id: searchSubTask.id}, sub)
      }    
    })

    data.attachments?.forEach(async (attachment) => {
      const searchAttachment = await attachmentRepository.findOneBy({currentUrl: attachment})
      if(!searchAttachment){
        const createAttachment = attachmentRepository.create({currentUrl: attachment})
        task!.attachments.push(createAttachment)
      }else{
        await attachmentRepository.update({id: searchAttachment.id}, {currentUrl: attachment})
      } 
    })

    if(data.category){
      const searchCategory = await categoryRepository.findOneBy({name: data.category.name})
      if(!searchCategory){
        const createCategory = categoryRepository.create(data.category);
        await categoryRepository.save(createCategory)
        task!.category = createCategory
      }else{
        task!.category = searchCategory
      }
    }
   
    if(data.deadline){
      task!.deadline = data.deadline
    }
    if(data.title){
      task!.title = data.title
    }
    if(data.description){
      task!.description = data.description
    }
    if(data.status){
      task!.status = data.status
    }

    membersArray?.forEach(async (member) => {
        if(!task!.members.includes(member)){
          task?.members.push(member)
        }
    })
    
    await taskRepository.save(task!)
    
    return (task)
};

export default updateTaskService;