import { Todo } from "../../../types/Todo";

type PhotoCardProps = {
  currentTodo: Todo;
  takePhoto: () => Promise<void>;
  pickFromGallery: () => Promise<void>;
};

export const PhotoCard: React.FC<PhotoCardProps> = ({
  currentTodo,
  takePhoto,
  pickFromGallery,
}) => {
  return (
    <div className="todo-details__card">
      <div className="todo-details__field-header">
        <span className="todo-details__icon">📷</span>
        <span className="todo-details__field-label">Photo</span>
      </div>

      {currentTodo.photoUrl ? (
        <div className="todo-details__photo-container">
          <img
            src={currentTodo.photoUrl}
            alt="Фото задачі"
            className="todo-details__photo"
          />
          <div className="todo-details__photo-actions">
            <button onClick={takePhoto} className="todo-details__photo-btn">
              📸 Camera
            </button>
            <button
              onClick={pickFromGallery}
              className="todo-details__photo-btn"
            >
              🖼️ Gallery
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-details__photo-empty">
          <p className="todo-details__photo-empty-text">Фото ще не додано</p>
          <div className="todo-details__photo-actions">
            <button onClick={takePhoto} className="todo-details__photo-btn">
              📸 Camera
            </button>
            <button
              onClick={pickFromGallery}
              className="todo-details__photo-btn"
            >
              🖼️ Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
