import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import Task from "./task.entity";

@Entity("subtasks")
class SubTask {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 70 })
    name: string;

    @Column({ type: "boolean"})
    completed: boolean;

    @ManyToOne(() => Task, (task) => task.subTasks)
    task: Task;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;
}

export default SubTask;
