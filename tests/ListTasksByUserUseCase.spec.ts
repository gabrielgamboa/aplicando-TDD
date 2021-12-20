import { ITasksRepository } from "../src/modules/tasks/repositories/ITasksRepository";
import { TasksRepositoryMock } from "../src/modules/tasks/repositories/mocks/TasksRepositoryMock";

import { ListTasksByUserUseCase } from "../src/modules/tasks/useCases/listTasksByUser/ListTasksByUserUseCase";

const mockTasks = () => ([
    {
        id: "abcd",
        name: "Fazer ovo",
        description: "fazer ovo com bastante sal",
        done: false,
        user_id: "idmockado"
    },
    {
        id: "asdasdas",
        name: "Fazer ovo",
        description: "fazer ovo com bastante sal",
        done: false,
        user_id: "idmockado"
    },
]);


let tasksRepositoryMock: ITasksRepository;
let listTasksByUserUseCase: ListTasksByUserUseCase;

describe("List tasks by user", () => {
    beforeEach(() => {
        tasksRepositoryMock = new TasksRepositoryMock();
        listTasksByUserUseCase = new ListTasksByUserUseCase(tasksRepositoryMock);
    });


    it("should be able to list tasks from an user", async () => {
        const tasks = mockTasks();

        jest.spyOn(tasksRepositoryMock, "findByUser").mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve(tasks);
        }));

        const user_id = tasks[0].user_id;
        const sut = await listTasksByUserUseCase.execute(user_id);

        expect(sut).toEqual(tasks);
    });

    it("should not be able to list tasks from an user when not exists tasks", async () => {
        expect(async () => {
            const tasks = mockTasks();
            const user_id = tasks[0].user_id;
            await listTasksByUserUseCase.execute(user_id);
        }).rejects.toThrow();
    });
});