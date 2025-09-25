import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export const validateSignUp = (
  email: string,
  name: string,
  password: string,
  repeatePassword: string,
  setError: Dispatch<SetStateAction<string>>,
  navigate: NavigateFunction,
  handleSignUp: (
    name: string,
    email: string,
    password: string,
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => Promise<void>
): boolean => {
  if (!email || !name || !password || !repeatePassword) {
    setError("Please fill in all fields");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Invalid email format");
    return false;
  }

  if (name.length < 3 || name.length > 20) {
    setError("Name must be between 3 and 20 characters");
    return false;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return false;
  }

  if (repeatePassword !== password) {
    setError("Passwords do not match");
    console.log(repeatePassword);
    console.log(password);
    return false;
  }

  setError("");
  handleSignUp(name, email, password, setError, navigate);

  return true;
};

export const validateLogin = (
  email: string,
  password: string,
  setError: Dispatch<SetStateAction<string>>,
  navigate: NavigateFunction,
  handleLogin: (
    email: string,
    password: string,
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => Promise<void>
): boolean => {
  if (!email || !password) {
    setError("Please fill in all fields");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Invalid email format");
    return false;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return false;
  }

  setError("");
  handleLogin(email, password, setError, navigate);

  return true;
};
