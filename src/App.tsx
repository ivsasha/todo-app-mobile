import { setupIonicReact } from "@ionic/react";
import { useState } from "react";
import { Filter } from "./types/Filter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import { MainTodos } from "./components/MainTodos";
import { Navigation } from "./components/Navigation";
import { useTodos } from "./hooks/useTodos";
import { useAuth } from "./hooks/useAuth";

setupIonicReact();

export const App: React.FC = () => {
  const { userId, userName, logout } = useAuth();
  const {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    clearCompleted,
    error,
    clearError,
    inputRef,
    changeComplite
  } = useTodos(userId);
  const [filterSelect, setFilterSelected] = useState<Filter>(Filter.All);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = todos.filter((todo) => {
    if (filterSelect === Filter.Active) return !todo.completed;
    if (filterSelect === Filter.Completed) return todo.completed;
    return true;
  });

  return (
    <Router basename="/todo-app-mobile">
      <div className="todoapp">
        <Navigation userId={userId} userName={userName} onLogout={logout} />

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainTodos
                  todos={todos}
                  filteredTodos={filteredTodos}
                  postTodos={addTodo}
                  changeComplite={changeComplite}
                  removeTodos={removeTodo}
                  changeTodo={updateTodo}
                  clearCompleted={clearCompleted}
                  filterSelect={filterSelect}
                  setFilterSelected={setFilterSelected}
                  error={error}
                  clearError={clearError}
                  inputRef={inputRef}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};
