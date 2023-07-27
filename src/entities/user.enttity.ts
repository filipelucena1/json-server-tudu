import { getRounds, hashSync } from "bcryptjs";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToMany
} from "typeorm";
import Task from "./task.entity";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ type: "varchar", length: 70, unique: true })
    email: string;

    @Column({ type: "varchar", length: 120, select: false })
    password: string;

    @OneToMany(() => Task, task => task.user, {cascade: true, nullable: true})
    tasks: Task;

    @ManyToMany(() => Task, task => task.members, {nullable: true})
    sharedTasks: Task[];

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashInsertPassword() {
        const isEncrypted = getRounds(this.password);
        if (!isEncrypted) {
            this.password = hashSync(this.password, 10);
        }
    }
}

export default User;
