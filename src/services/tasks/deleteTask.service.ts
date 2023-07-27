import { taskRepository } from "../../repositories"


const deleteTaskService = async (taskId: string): Promise<number> =>{
    const task = await taskRepository.findOneBy({ id: taskId })
    await taskRepository.remove(task!)
    return 204
}

export default deleteTaskService