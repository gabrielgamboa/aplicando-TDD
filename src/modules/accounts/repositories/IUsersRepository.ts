import { User } from "../entities/User";

interface IUsersRepository {
    create(name: string, email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository}