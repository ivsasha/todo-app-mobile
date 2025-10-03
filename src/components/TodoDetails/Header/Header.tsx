import { Link } from "react-router-dom";

type HeaderProps = {
  handleDelete: () => void;
};

export const Header: React.FC<HeaderProps> = ({ handleDelete }) => {
  return (
    <div className="todo-details__header">
      <Link to="/" className="todo-details__back">
        ←
      </Link>
      <h1 className="todo-details__header-title">Details</h1>
      <button
        className="todo-details__delete-icon"
        onClick={handleDelete}
        title="Видалити"
      >
        🗑️
      </button>
    </div>
  );
};
