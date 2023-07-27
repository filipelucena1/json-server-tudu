import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import Task from "./task.entity";

@Entity("attachments")
class Attachment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar"})
    currentUrl: string;

    @ManyToOne(() => Task, (task) => task.attachments)
    task: Task;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;
}

export default Attachment;
