import { v4 as uuidv4 } from "uuid";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "../../accounts/entities/User";

@Entity("tasks")
class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    done?: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User;

    @Column()
    user_id: string;

    constructor() {
        if (!this.id)
            this.id = uuidv4();
    }
}

export { Task }