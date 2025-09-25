import React from "react";
import { Link } from "react-router-dom";

type PropsNavigation = {
  userId: null | string;
  userName: string | null;
  onLogout: () => Promise<void>;
}

export const Navigation: React.FC<PropsNavigation> = ({ userId, userName, onLogout }) => {
  return (
    <div className="todoapp__nav">
      {!userId ? (
        <>
          <Link to="/login" className="todoapp__button todoapp__button--login">
            Login
          </Link>
          <Link
            to="/signup"
            className="todoapp__button todoapp__button--signup"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <div className="todoapp__user">
          <span className="todoapp__user-name">{userName}</span>
          <button
            onClick={onLogout}
            className="todoapp__button todoapp__button--logout"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
