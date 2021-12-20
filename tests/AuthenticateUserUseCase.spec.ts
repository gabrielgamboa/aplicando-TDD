import { hash } from "bcrypt";

import { IUsersRepository } from "../src/modules/accounts/repositories/IUsersRepository";
import { UsersRepositoryMock } from "../src/modules/accounts/repositories/mocks/UsersRepositoryMock";
import { AuthenticateUserUseCase } from "../src/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: IUsersRepository;

const mockUser = async () => (
    {
        id: "mockid",
        name: "Gabriel",
        email: "gabriel@gmail.com",
        password: await hash("1234", 8),
    }
);

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryMock();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    })

    it("should be able to authenticate an user", async () => {
        const user = await mockUser();

        jest.spyOn(usersRepository, "findByEmail").mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve(user);
        }));


        const result = await authenticateUserUseCase.execute({
            email: "gabriel@gmail.com",
            password: "1234"
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a nonexisting user", async () => {
        expect(async () => {
            const result = await authenticateUserUseCase.execute({
                email: "fake@gmail.com",
                password: "123456"
            });
        }).rejects.toThrow();
    })
});