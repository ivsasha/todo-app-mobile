import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateLogin } from "../../services/validate";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {
    handleLogin,
    handleGithubLogin,
    handleGoogleLogin,
    handleForgotPassword,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login">
      <Link to={"/"} className="login__back">
        <button className="login__back-button">← Back</button>
      </Link>

      <div className="login__header">
        <h1 className="login__title">Log in</h1>
        <Link to={"/signup"}>
          <button className="login__link">Sign up</button>
        </Link>
      </div>

      <div className="login__form">
        <div className="login__field">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
          />
        </div>

        <div className="login__field login__field--password">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
          />
          <button
            className="login__forgot"
            onClick={() => handleForgotPassword(email, setError, setMessage)}
          >
            Forgot
          </button>
        </div>
      </div>

      <button
        className="login__button"
        onClick={() => validateLogin(email, password, setError, navigate ,handleLogin)}
      >
        Log in
      </button>

      {error && <p className="login__error">{error}</p>}
      {message && <p className="login__success">{message}</p>}

      <p className="login__divider">Or sign up with social account</p>

      <div className="login__socials">
        <button
          className="login__social"
          onClick={() => handleGoogleLogin(setError, navigate)}
        >
          Google
        </button>
        <button
          className="login__social"
          onClick={() => handleGithubLogin(setError, navigate)}
        >
          GitHub
        </button>
      </div>
    </div>
  );
};
