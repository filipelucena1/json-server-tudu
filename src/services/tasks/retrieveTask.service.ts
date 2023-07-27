import { taskRepository } from "../../repositories";

const retrieveTaskService = async (taskId: string) => {
  const task = await taskRepository.findOne({
    where: { id: taskId },
    relations: { members: true, user: true, comments: true, attachments: true, category: true },
  });

  return task;
};

export default retrieveTaskService;
