import {v4 as uuidv4} from "uuid";

class CreateUserUseCase {
    constructor(private usersRepository: UsersRepositoryMock) {}

    async execute(name: string, email: string, password: string): Promise<void> {
        this.usersRepository.create(name, email, password);
    }
}

class UsersRepositoryMock {
    id: string;
    name?: string;
    email?: string;
    password?: string;

    constructor() {
        if (!this.id) 
            this.id = uuidv4();
    }

    async create(name: string, email: string, password: string): Promise<void> {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}


describe("CreateUser", () => {
    it("should be able to create a new user", async () => {
        const usersRepositoryMock = new UsersRepositoryMock();
        const sut = new CreateUserUseCase(usersRepositoryMock); //system under test
        
        await sut.execute("Gabriel", "gabriel@gmail.com", "1234");

        expect(usersRepositoryMock.email).toBe("gabriel@gmail.com");
    });
});