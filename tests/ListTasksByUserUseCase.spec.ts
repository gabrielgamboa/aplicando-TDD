import { IUsersRepository } from "../src/modules/accounts/repositories/IUsersRepository";
import { UsersRepositoryMock } from "../src/modules/accounts/repositories/mocks/UsersRepositoryMock";
import { ITasksRepository } from "../src/modules/tasks/repositories/ITasksRepository";
import { TasksRepositoryMock } from "../src/modules/tasks/repositories/mocks/TasksRepositoryMock";

import { CreateTaskUseCase } from "../src/modules/tasks/useCases/createTask/CreateTaskUseCase";
import { ListTasksByUserUseCase } from "../src/modules/tasks/useCases/listTasksByUser/ListTasksByUserUseCase";

const mockUserAccount = () => ({
    id: "idmockado",
    name: "carlos",
    email: "carlos@cntdev.com",
    password: "1234",
    tasks: []
});


let tasksRepositoryMock: ITasksRepository;
let usersRepository: IUsersRepository;
let createTaskUseCase: CreateTaskUseCase;
let listTasksByUserUseCase: ListTasksByUserUseCase;

describe("List tasks by user", () => {
    beforeEach(() => {
        tasksRepositoryMock = new TasksRepositoryMock();
        usersRepository = new UsersRepositoryMock();
        createTaskUseCase = new CreateTaskUseCase(tasksRepositoryMock, usersRepository);
        listTasksByUserUseCase = new ListTasksByUserUseCase(tasksRepositoryMock);
    });


    it("should be able to list tasks from an user", async () => {
        const mockUser = mockUserAccount();

        jest.spyOn(usersRepository, "findById").mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve(mockUser);
        }));

        await createTaskUseCase.execute({
            name: "Fazer ovo",
            description: "Fazer ovo com bastante sal",
            user_id: mockUser.id
        });

        jest.spyOn(usersRepository, "findById").mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve(mockUser);
        }));

        await createTaskUseCase.execute({
            name: "Varrer a casa",
            description: "Varrer a casa com a nova vassoura que meu pai comprou",
            user_id: mockUser.id
        });

        const sut = await listTasksByUserUseCase.execute("idmockado");

        expect(sut).toHaveLength(2);
    });
});