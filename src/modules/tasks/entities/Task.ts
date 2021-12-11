import { v4 as uuidv4 } from "uuid";

class Task {
    id: string;
    name: string;
    description: string;
    done: boolean;
    user_id: number;

    constructor() {
        if (!this.id)
            this.id = uuidv4();
        
        this.done = true;
    }
}

export { Task }