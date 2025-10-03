import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types/Todo";
import { TaskService } from "../services/TaskService";

export const useTodoDelete = (currentTodo: Todo | null) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (!currentTodo) return;
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!currentTodo) return;

    try {
      await TaskService.remove(currentTodo.id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    handleDelete,
    handleConfirmDelete,
    handleCancel,
  };
};
