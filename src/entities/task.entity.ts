import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable
} from "typeorm";
import User from "./user.enttity";
import SubTask from "./subTask.entity";
import Attachment from "./attachment.entity";
import Comment from "./comment.entity";
import Category from "./category.entity";

@Entity("tasks")
class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "varchar", length: 10 })
    status: string;
    
    @Column({ type: "varchar", length: 300, nullable: true })
    description: string;

    @Column({ type: "date"})
    deadline: string;

    @OneToMany(() => SubTask, (subTask) => subTask.task, { cascade: true})
    subTasks: SubTask[];

    @OneToMany(() => Attachment, (attachment) => attachment.task, { cascade: true, nullable: true })
    attachments: Attachment[];

    @OneToMany(() => Comment, (comment) => comment.task, { cascade: true, nullable: true })
    comments: Comment[];

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @ManyToOne(() => Category, (category) => category.tasks)
    category: Category

    @ManyToMany(() => User, (user) => user.sharedTasks, {cascade: true})
    @JoinTable()
    members: User[];

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;
}

export default Task;
