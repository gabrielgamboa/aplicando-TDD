import { ITasksRepository } from "../src/modules/tasks/repositories/ITasksRepository";
import { TasksRepositoryMock } from "../src/modules/tasks/repositories/mocks/TasksRepositoryMock";
import { CreateTaskUseCase } from "../src/modules/tasks/useCases/CreateTaskUseCase";

let createTaskUseCase: CreateTaskUseCase;
let tasksRepository: ITasksRepository;

describe("CreateTask", () => {
    beforeEach(() => {
        tasksRepository = new TasksRepositoryMock();
        createTaskUseCase = new CreateTaskUseCase(tasksRepository);
    });

    it("should be able to create a new task", async () => {
        const task = await createTaskUseCase.execute("Fazer ovo", "fazer ovo com bastante sal", "98yd98asy8d");
        expect(task).toHaveProperty("id");
    });
});