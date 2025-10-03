import { useEffect, useRef, useState } from "react";
import { Todo } from "../types/Todo";
import { TaskService } from "../services/TaskService";

export const useTodos = (userId: string | null, refreshKey: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userId) {
      setTodos([]);
      return;
    }
    TaskService.getAll(userId)
      .then(setTodos)
      .catch(() => setError("Unable to load todos"));
  }, [userId, refreshKey]);

  const addTodo = async (title: string) => {
    if (!userId) return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTodo = { userId, title: trimmedTitle, completed: false };
    const docId = await TaskService.add(newTodo);
    setTodos((prev) => [...prev, { ...newTodo, id: docId }]);
  };

  const removeTodo = async (id: string) => {
    if (!userId) return;
    await TaskService.remove(id);
    setTodos(await TaskService.getAll(userId));
  };

  const updateTodo = async (todo: Todo) => {
    if (!userId) return;
    await TaskService.update(todo);
    setTodos(await TaskService.getAll(userId));
  };

  const changeComplite = async () => {
    if (!userId) return;
    try {
      const isAllCompleted = todos.every((t) => t.completed);
      const updated = todos.map((t) => ({ ...t, completed: !isAllCompleted }));
      for (const todo of updated) {
        await TaskService.update(todo);
      }
      setTodos(await TaskService.getAll(userId));
    } catch {
      setError("Unable to update todos");
    }
  };

  const clearCompleted = async () => {
    if (!userId) return;
    const completed = todos.filter((t) => t.completed);
    for (const t of completed) await TaskService.remove(t.id);
    setTodos(await TaskService.getAll(userId));
  };

  const clearError = () => setError("");

  return {
    todos,
    setTodos,
    addTodo,
    removeTodo,
    updateTodo,
    clearCompleted,
    error,
    setError,
    inputRef,
    changeComplite,
    clearError
  };
};
