import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import Task from "./task.entity";

@Entity("categories")
class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 70 })
    name: string;
    
    @Column({ type: "varchar", length: 70 })
    color: string;

    @OneToMany(() => Task, (task) => task.category, {cascade: true})
    tasks: Task[];

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;
}

export default Category;
