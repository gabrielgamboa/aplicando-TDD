import {v4 as uuidv4} from "uuid";

class User {
    id: string;
    name?: string;
    email?: string;
    password?: string;


    constructor() {
        if (!this.id) 
            this.id = uuidv4();
    }
}

class CreateUserUseCase {
    constructor(private usersRepository: UsersRepositoryMock) {}

    async execute(name: string, email: string, password: string): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) throw new Error("User Already Exists");

        const user = this.usersRepository.create(name, email, password);
        return user;
    }
}


interface IUsersRepository {
    create(name: string, email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

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


describe("CreateUser", () => {
    it("should be able to create a new user", async () => {
        const usersRepositoryMock = new UsersRepositoryMock();
        const sut = new CreateUserUseCase(usersRepositoryMock); //system under test
        
        const user = await sut.execute("Gabriel", "gabriel@gmail.com", "1234");

        expect(user).toHaveProperty("id");
    });

    it("should not be able to create a new user with same email", async () => {
        expect(async () => {
            const usersRepositoryMock = new UsersRepositoryMock();
            const sut = new CreateUserUseCase(usersRepositoryMock); //system under test
            
            const user = await sut.execute("Gabriel", "gabriel@gmail.com", "1234");
            const user2 = await sut.execute("Vinicius", "gabriel@gmail.com", "1234");
        }).rejects.toThrow();
    });
});