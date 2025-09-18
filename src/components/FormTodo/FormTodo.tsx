import React, { useEffect, useState } from "react";
import { Todo } from "../../types/Todo";
import classNames from "classnames";

type FormTodoProps = {
  postTodos: (s: string) => void;
  changeComplite: () => void;
  todos: Todo[];
  isDisabledInput: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const FormTodo: React.FC<FormTodoProps> = ({
  postTodos,
  changeComplite,
  todos,
  isDisabledInput,
  inputRef,
  searchTerm,
  setSearchTerm,
}) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const isAllCompleted = todos.every((todo) => todo.completed);

    setIsActive(isAllCompleted);
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames("todoapp__toggle-all", { active: isActive })}
          data-cy="ToggleAllButton"
          onClick={changeComplite}
        />
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await postTodos(searchTerm);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
          disabled={isDisabledInput}
        />
      </form>
    </header>
  );
};
