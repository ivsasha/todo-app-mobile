import { useState, useEffect } from "react";
import { Todo } from "../types/Todo";

export const useTodoState = (todos: Todo[], id?: string) => {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const foundTodo = todos.find((item) => item.id === id);
    if (foundTodo) {
      setCurrentTodo(foundTodo);
      setTitle(foundTodo.title);

      if (foundTodo.dueDate) {
        const date = new Date(foundTodo.dueDate);
        setDueDate(date.toISOString().split("T")[0]);
      }

      if (foundTodo.description) {
        setDescription(foundTodo.description);
      }
    }
  }, [todos, id]);

  return {
    currentTodo,
    setCurrentTodo,
    title,
    setTitle,
    dueDate,
    setDueDate,
    description,
    setDescription,
  };
};
