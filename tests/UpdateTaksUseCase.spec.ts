import { ITasksRepository } from "../src/modules/tasks/repositories/ITasksRepository";
import { TasksRepositoryMock } from "../src/modules/tasks/repositories/mocks/TasksRepositoryMock";
import { UpdateTaskUseCase } from "../src/modules/tasks/useCases/updateTask/UpdateTaskUseCase";


const mockTask = () => (
    {
        id: "abcd",
        name: "Fazer ovo",
        description: "fazer ovo com bastante sal",
        done: false,
        user_id: "idmockado"
    }
)

let tasksRepositoryMock: ITasksRepository;
let updateTaskUseCase: UpdateTaskUseCase;

describe("Update task", () => {
    beforeEach(() => {
        tasksRepositoryMock = new TasksRepositoryMock();
        updateTaskUseCase = new UpdateTaskUseCase(tasksRepositoryMock);
    });

    it("should be able to update a task", async () => {
        const mockTaskInstance = mockTask();

        jest.spyOn(tasksRepositoryMock, "findById").mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve(mockTaskInstance);
        }));

        const task = await updateTaskUseCase.execute(mockTaskInstance);

        expect(task.done).toBe(true);
    });

    it("should not be able to update a task if not exists", async () => {
        expect(async () => {
            const mockTaskInstance = mockTask();
            await updateTaskUseCase.execute(mockTaskInstance);
            
        }).rejects.toThrow();
    });
});