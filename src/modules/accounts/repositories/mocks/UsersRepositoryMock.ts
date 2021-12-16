import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryMock implements IUsersRepository {
    users: User[] = [];

    async create({name, email, password}: ICreateUserDTO): Promise<User> {
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

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }
}

export { UsersRepositoryMock }