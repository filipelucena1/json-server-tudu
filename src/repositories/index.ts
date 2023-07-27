import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Attachment from "../entities/attachment.entity";
import User from "../entities/user.enttity";
import Category from "../entities/category.entity";
import SubTask from "../entities/subTask.entity";
import Task from "../entities/task.entity";
import Comment from "../entities/comment.entity";


const attachmentRepository: Repository<Attachment> = AppDataSource.getRepository(Attachment);

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

const subTaskRepository: Repository<SubTask> = AppDataSource.getRepository(SubTask);

const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);

const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

export {
  taskRepository,
  userRepository,
  subTaskRepository,
  attachmentRepository,
  commentRepository,
  categoryRepository
};
