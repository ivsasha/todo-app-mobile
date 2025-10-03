type DateCardProps = {
  dueDate: string;
  setDueDate: (value: React.SetStateAction<string>) => void;
  handleDateChange: (newDate: string) => Promise<void>;
};

export const DateCard: React.FC<DateCardProps> = ({
  dueDate,
  setDueDate,
  handleDateChange,
}) => {
  return (
    <div className="todo-details__card">
      <div className="todo-details__field-header">
        <span className="todo-details__icon">📅</span>
        <span className="todo-details__field-label">Date</span>
      </div>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        onBlur={(e) => handleDateChange(e.target.value)}
        className="todo-details__date-input"
      />
    </div>
  );
};
