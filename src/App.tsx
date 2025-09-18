import { setupIonicReact } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Filter } from "./types/Filter";
import { Todo } from "./types/Todo";
import { FormTodo } from "./components/FormTodo";
import { TodoList } from "./components/TodoList";
import { FooterTodos } from "./components/FooterTodos";
import { ErrorTodos } from "./components/ErrorTodos";
import { TaskService } from "./services/TaskService";

setupIonicReact();

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [filterSelect, setFilterSelected] = useState<Filter>(Filter.All);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // завантажуємо задачі при старті
  useEffect(() => {
    TaskService.getAll()
      .then(setTodos)
      .catch(() => setError("Unable to load todos"));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filterSelect === Filter.Active) return !todo.completed;
    if (filterSelect === Filter.Completed) return todo.completed;
    return true;
  });

  const postTodos = async (title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Title should not be empty");
      inputRef.current?.focus();
      return;
    }

    setIsDisabledInput(true);

    const newTodo: Todo = {
      id: String(Date.now()),
      userId: 3177,
      title: trimmedTitle,
      completed: false,
    };

    try {
      await TaskService.add(newTodo);
      setTodos(await TaskService.getAll());
      setSearchTerm("");
    } catch {
      setError("Unable to add a todo");
    } finally {
      setIsDisabledInput(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const removeTodos = async (todoId: string) => {
    try {
      await TaskService.remove(todoId);
      setTodos(await TaskService.getAll());
      inputRef.current?.focus();
    } catch {
      setError("Unable to delete a todo");
    }
  };

  const changeTodo = async (
    todoId: string,
    title: string,
    completed: boolean
  ) => {
    try {
      await TaskService.update({ id: todoId, title, completed, userId: 3177 });
      setTodos(await TaskService.getAll());
    } catch {
      setError("Unable to update a todo");
    }
  };

  const changeComplite = async () => {
    try {
      const isAllCompleted = todos.every((t) => t.completed);
      const updated = todos.map((t) => ({ ...t, completed: !isAllCompleted }));

      for (const todo of updated) {
        await TaskService.update(todo);
      }

      setTodos(await TaskService.getAll());
    } catch {
      setError("Unable to update todos");
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter((t) => t.completed);
      for (const todo of completedTodos) {
        await TaskService.remove(todo.id);
      }
      setTodos(await TaskService.getAll());
      inputRef.current?.focus();
    } catch {
      setError("Unable to clear completed todos");
    }
  };

  const filter = (type: Filter) => setFilterSelected(type);

  const clearError = () => setError("");

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormTodo
          postTodos={postTodos}
          changeComplite={changeComplite}
          todos={todos}
          isDisabledInput={isDisabledInput}
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
            filter={filter}
            clearCompleted={clearCompleted}
            selected={filterSelect}
          />
        )}
      </div>

      <ErrorTodos error={error} clearError={clearError} />
    </div>
  );
};
