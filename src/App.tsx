import { setupIonicReact } from "@ionic/react";
import { useState } from "react";
import { Filter } from "./types/Filter";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import { MainTodos } from "./components/MainTodos";
import { Navigation } from "./components/Navigation";
import { useTodos } from "./hooks/useTodos";
import { useAuth } from "./hooks/useAuth";
import { TodoDetails } from "./components/TodoDetails";
import { Routes, Route, useLocation } from "react-router-dom";
import { startListening } from "./services/speach";
import { useConnection } from "./hooks/useConnection";

setupIonicReact();

export const App: React.FC = () => {
  const location = useLocation();
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
    changeComplite,
  } = useTodos(userId, location.pathname);
  const [filterSelect, setFilterSelected] = useState<Filter>(Filter.All);
  const [searchTerm, setSearchTerm] = useState("");
  const { isConnected } = useConnection();

  async function handleListener() {
    const result = await startListening();

    setSearchTerm(result.join(" "));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filterSelect === Filter.Active) return !todo.completed;
    if (filterSelect === Filter.Completed) return todo.completed;
    return true;
  });

  return (
    <div className="todoapp">
      {!isConnected && (
        <div className="todoapp__inet-error">No Internet Connection</div>
      )}

      {isConnected && (
        <>
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
                    handleListener={handleListener}
                  />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/details/:id"
              element={
                <PrivateRoute>
                  <TodoDetails todos={todos} />
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};
