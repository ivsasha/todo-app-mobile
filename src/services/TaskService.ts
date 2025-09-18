import { storage } from "./Storage";
import { Todo } from "../types/Todo";

const TASKS_KEY = "tasks";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const TaskService = {
  async getAll(): Promise<Todo[]> {
    const tasks = await storage.get(TASKS_KEY);
    await wait(200);
    return tasks || [];
  },
  async add(task: Todo) {
    const tasks = await TaskService.getAll();
    tasks.push(task);
    await wait(200);
    await storage.set(TASKS_KEY, tasks);
  },
  async update(task: Todo) {
    const tasks = await TaskService.getAll();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index > -1) tasks[index] = task;
    await wait(200);
    await storage.set(TASKS_KEY, tasks);
  },
  async remove(id: string) {
    let tasks = await TaskService.getAll();
    tasks = tasks.filter((t) => t.id !== id);
    await wait(200);
    await storage.set(TASKS_KEY, tasks);
  },
};
