import { taskRepository } from "../../repositories";

const ListAllTasksService = async (userId: string) => {
  const taskList = await taskRepository.find({
    where: {user: {id: userId}},
    relations: ["user", "members", "category", "attachments", "subTasks", "comments"],
  });

  return taskList;
};

export default ListAllTasksService;
