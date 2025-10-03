import React from "react";
import { useParams, Link } from "react-router-dom";
import { Todo } from "../../types/Todo";
import { ModalDelete } from "../ModalDelete";
import { PhotoCard } from "./PhotoCard";
import { DateCard } from "./DateCard";
import { DescriptionCard } from "./DescriptionCard";
import { TaskStatusCard } from "./TaskStatusCard";
import { Header } from "./Header";
import { useTodoState } from "../../hooks/useTodoState";
import { useTodoPhotos } from "../../hooks/useTodoPhotos";
import { useTodoUpdates } from "../../hooks/useTodoUpdates";
import { useTodoDelete } from "../../hooks/useTodoDelete";

type TodoDetailsProps = {
  todos: Todo[];
};

export const TodoDetails: React.FC<TodoDetailsProps> = ({ todos }) => {
  const { id } = useParams<{ id: string }>();
  const {
    currentTodo,
    setCurrentTodo,
    title,
    setTitle,
    dueDate,
    setDueDate,
    description,
    setDescription,
  } = useTodoState(todos, id);

  const { takePhoto, pickFromGallery } = useTodoPhotos(
    currentTodo,
    setCurrentTodo
  );

  const {
    handleStatusChange,
    handleTitleChange,
    handleDescriptionChange,
    handleDateChange,
  } = useTodoUpdates(
    currentTodo,
    setCurrentTodo,
    setTitle,
    setDueDate,
    setDescription
  );

  const { isModalOpen, handleDelete, handleConfirmDelete, handleCancel } =
    useTodoDelete(currentTodo);

  if (!currentTodo) {
    return (
      <div className="todo-details">
        <div className="todo-details__header">
          <Link to="/" className="todo-details__back">
            ←
          </Link>
          <h1 className="todo-details__header-title">Деталі</h1>
          <div className="todo-details__placeholder"></div>
        </div>
        <div className="todo-details__empty">
          <p>Задача не знайдена</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-details">
      {/* Header */}
      <Header handleDelete={handleDelete} />

      {/* Main Content */}
      <div className="todo-details__content">
        {/* Task Status Card */}
        <TaskStatusCard
          currentTodo={currentTodo}
          handleStatusChange={handleStatusChange}
          title={title}
          setTitle={setTitle}
          handleTitleChange={handleTitleChange}
        />

        {/* Description Card */}
        <DescriptionCard
          description={description}
          setDescription={setDescription}
          handleDescriptionChange={handleDescriptionChange}
        />

        {/* Date Card */}
        <DateCard
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleDateChange={handleDateChange}
        />

        {/* Photo Card */}
        <PhotoCard
          currentTodo={currentTodo}
          takePhoto={takePhoto}
          pickFromGallery={pickFromGallery}
        />

        {/* Delete Button */}
        <button className="todo-details__delete-btn" onClick={handleDelete}>
          Delete Task
        </button>
      </div>

      {/* Modal Window */}
      {isModalOpen && (
        <ModalDelete
          handleCancel={handleCancel}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};
