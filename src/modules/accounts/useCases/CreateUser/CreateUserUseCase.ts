import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists)
            throw new Error("User Already Exists");

        const passwordHash = await hash(password, 8);
        
        const user = this.usersRepository.create({ 
            name,
            email,
            password: passwordHash 
        });

        return user;
    }
}

export { CreateUserUseCase }

