import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            email,
            password,
        }); 

        await this.repository.save(user);

        return user;
    }

    findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ email });
    }

    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}

export { UsersRepository }