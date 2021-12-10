import { IUsersRepository } from "../src/modules/accounts/repositories/IUsersRepository";
import { UsersRepositoryMock } from "../src/modules/accounts/repositories/mocks/UsersRepositoryMock";
import { CreateUserUseCase } from "../src/modules/accounts/useCases/CreateUser/CreateUserUseCase";

let usersRepositoryMock: IUsersRepository;
let sut: CreateUserUseCase;

describe("CreateUser", () => {
    beforeEach(() => {
        usersRepositoryMock = new UsersRepositoryMock();
        sut = new CreateUserUseCase(usersRepositoryMock); //system under test
    });

    it("should be able to create a new user", async () => {
        const user = await sut.execute("Gabriel", "gabriel@gmail.com", "1234");
        expect(user).toHaveProperty("id");
    });

    it("should not be able to create a new user with same email", async () => {
        expect(async () => {
            const user = await sut.execute("Gabriel", "gabriel@gmail.com", "1234");
            const user2 = await sut.execute("Vinicius", "gabriel@gmail.com", "1234");
        }).rejects.toThrow();
    });
});