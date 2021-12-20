import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";
import { Task } from "../../tasks/entities/Task";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name?: string;
    
    @Column()
    email?: string;
    
    @Column()
    password?: string;

    @OneToMany(type => Task, task => task.user)
    tasks?: Task[];

    constructor() {
        if (!this.id) 
            this.id = uuidv4();
    }
}

export { User }


