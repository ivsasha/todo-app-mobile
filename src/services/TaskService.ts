import { storage } from "./Storage";
import { Todo } from "../types/Todo";

const TASKS_KEY = "tasks";

export const TaskService = {
  async getAll(): Promise<Todo[]> {
    const tasks = await storage.get(TASKS_KEY);
    return tasks || [];
  },
  async add(task: Todo) {
    const tasks = await TaskService.getAll();
    tasks.push(task);
    await storage.set(TASKS_KEY, tasks);
  },
  async update(task: Todo) {
    const tasks = await TaskService.getAll();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index > -1) tasks[index] = task;
    await storage.set(TASKS_KEY, tasks);
  },
  async remove(id: string) {
    let tasks = await TaskService.getAll();
    tasks = tasks.filter((t) => t.id !== id);
    await storage.set(TASKS_KEY, tasks);
  },
};
