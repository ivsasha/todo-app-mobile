type DescriptionCardProps = {
  description: string;
  setDescription: (value: React.SetStateAction<string>) => void;
  handleDescriptionChange: (newDescription: string) => Promise<void>;
};

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  description,
  setDescription,
  handleDescriptionChange,
}) => {
  return (
    <div className="todo-details__card">
      <div className="todo-details__field-header">
        <span className="todo-details__icon">📝</span>
        <span className="todo-details__field-label">Description</span>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={(e) => handleDescriptionChange(e.target.value)}
        className="todo-details__textarea"
        placeholder="Додайте опис задачі..."
        rows={4}
      />
    </div>
  );
};
