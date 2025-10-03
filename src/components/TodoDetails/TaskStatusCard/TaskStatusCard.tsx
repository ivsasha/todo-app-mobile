import React from "react";
import { Todo } from "../../../types/Todo";

type TaskStatusCardProps = {
  currentTodo: Todo;
  handleStatusChange: () => Promise<void>;
  title: string;
  setTitle: (value: React.SetStateAction<string>) => void;
  handleTitleChange: (newTitle: string) => Promise<void>;
};

export const TaskStatusCard: React.FC<TaskStatusCardProps> = ({
  currentTodo,
  handleStatusChange,
  title,
  setTitle,
  handleTitleChange,
}) => {
  return (
    <div className="todo-details__card">
      <div className="todo-details__status-row">
        <label className="todo-details__checkbox-label">
          <input
            type="checkbox"
            className="todo-details__checkbox"
            checked={currentTodo.completed}
            onChange={handleStatusChange}
          />
          <span className="todo-details__checkbox-custom"></span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => handleTitleChange(e.target.value)}
          className={`todo-details__title-input ${
            currentTodo.completed ? "completed" : ""
          }`}
          placeholder="Назва задачі"
        />
      </div>
    </div>
  );
};
