import { useNavigate } from "react-router-dom";
import { Todo } from "../types/Todo";
import { TaskService } from "../services/TaskService";

export const useTodoUpdates = (
  currentTodo: Todo | null,
  setCurrentTodo: (todo: Todo) => void,
  setTitle: (title: string) => void,
  setDueDate: (dueDate: string) => void,
  setDescription: (description: string) => void
) => {
  const navigate = useNavigate();

  const handleStatusChange = async () => {
    if (!currentTodo) return;

    const updatedTodo = { ...currentTodo, completed: !currentTodo.completed };
    setCurrentTodo(updatedTodo);

    try {
      await TaskService.update(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo status:", error);
      setCurrentTodo(currentTodo);
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    if (!currentTodo) return;

    const trimmedTitle = newTitle.trim();
    setTitle(trimmedTitle);

    if (trimmedTitle.length === 0) {
      try {
        await TaskService.remove(currentTodo.id);
        navigate("/");
        return;
      } catch (error) {
        console.error("Failed to delete todo:", error);
        return;
      }
    }

    if (trimmedTitle === currentTodo.title.trim()) {
      return;
    }

    const updatedTodo = { ...currentTodo, title: trimmedTitle };
    setCurrentTodo(updatedTodo);

    try {
      await TaskService.update(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo title:", error);
      setTitle(currentTodo.title);
      setCurrentTodo(currentTodo);
    }
  };

  const handleDescriptionChange = async (newDescription: string) => {
    if (!currentTodo) return;

    const trimmedDescription = newDescription.trim();
    setDescription(trimmedDescription);

    const updatedTodo = { ...currentTodo, description: trimmedDescription };
    setCurrentTodo(updatedTodo);

    try {
      await TaskService.update(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo description:", error);
      setDescription(currentTodo.description || "");
      setCurrentTodo(currentTodo);
    }
  };

  const handleDateChange = async (newDate: string) => {
    if (!currentTodo) return;

    setDueDate(newDate);

    let updatedTodo;
    if (newDate) {
      const date = new Date(newDate);
      updatedTodo = { ...currentTodo, dueDate: date.toISOString() };
    } else {
      updatedTodo = { ...currentTodo, dueDate: undefined };
    }

    setCurrentTodo(updatedTodo);

    try {
      await TaskService.update(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo date:", error);
      if (currentTodo.dueDate) {
        const date = new Date(currentTodo.dueDate);
        setDueDate(date.toISOString().split("T")[0]);
      } else {
        setDueDate("");
      }
      setCurrentTodo(currentTodo);
    }
  };

  return {
    handleStatusChange,
    handleTitleChange,
    handleDescriptionChange,
    handleDateChange,
  };
};
