import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryMock implements IUsersRepository {
    users: User[] = [];

    async create(name: string, email: string, password: string): Promise<User> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password
        });

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }
}

export { UsersRepositoryMock }