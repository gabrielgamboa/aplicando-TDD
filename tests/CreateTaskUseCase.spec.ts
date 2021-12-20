import { IUsersRepository } from "../src/modules/accounts/repositories/IUsersRepository";
import { UsersRepositoryMock } from "../src/modules/accounts/repositories/mocks/UsersRepositoryMock";
import { ITasksRepository } from "../src/modules/tasks/repositories/ITasksRepository";
import { TasksRepositoryMock } from "../src/modules/tasks/repositories/mocks/TasksRepositoryMock";
import { CreateTaskUseCase } from "../src/modules/tasks/useCases/createTask/CreateTaskUseCase";

let createTaskUseCase: CreateTaskUseCase;
let tasksRepository: ITasksRepository;
let usersRepository: IUsersRepository;

const mockUserAccount = () => ({
    id: "huasahush",
    name: "carlos",
    email: "carlos@cntdev.com",
    password: "1234"
});

describe("CreateTask", () => {
    beforeEach(() => {
        tasksRepository = new TasksRepositoryMock();
        usersRepository = new UsersRepositoryMock();
        createTaskUseCase = new CreateTaskUseCase(tasksRepository, usersRepository);
    });

    it("should be able to create a new task", async () => {
        const mockUser = mockUserAccount();

        jest.spyOn(usersRepository, "findById").mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve(mockUser);
        }));

        const task = await createTaskUseCase.execute({
            name: "Fazer ovo",
            description: "Fazer ovo com bastante sal",
            user_id: mockUser.id
        });

        expect(task).toHaveProperty("id");
    });

    it("should not be able to create a new task if user_id does not exists", async () => {
        expect(async () => {
            await createTaskUseCase.execute({
                name: "Fazer ovo",
                description: "Fazer ovo com bastante sal",
                user_id: "asuhashuahus"
            });
        }).rejects.toThrow();
    });
});