import { Filter } from "../../types/Filter";
import { Todo } from "../../types/Todo";
import { ErrorTodos } from "../ErrorTodos";
import { FooterTodos } from "../FooterTodos";
import { FormTodo } from "../FormTodo";
import { TodoList } from "../TodoList";

type Props = {
  todos: Todo[];
  filteredTodos: Todo[];
  postTodos: (title: string) => Promise<void>;
  changeComplite: () => Promise<void>;
  removeTodos: (id: string) => Promise<void>;
  changeTodo: (todo: Todo) => Promise<void>;
  clearCompleted: () => Promise<void>;
  filterSelect: Filter;
  setFilterSelected: (f: Filter) => void;
  error: string;
  clearError: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export const MainTodos: React.FC<Props> = ({
  todos,
  filteredTodos,
  postTodos,
  changeComplite,
  removeTodos,
  changeTodo,
  clearCompleted,
  filterSelect,
  setFilterSelected,
  error,
  clearError,
  inputRef,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <>
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <FormTodo
          postTodos={postTodos}
          changeComplite={changeComplite}
          todos={todos}
          inputRef={inputRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos}
            deleteTodo={removeTodos}
            changeTodo={changeTodo}
          />
        )}

        {todos.length > 0 && (
          <FooterTodos
            todos={todos}
            filter={setFilterSelected}
            clearCompleted={clearCompleted}
            selected={filterSelect}
          />
        )}
      </div>

      <ErrorTodos error={error} clearError={clearError} />
    </>
  );
};
