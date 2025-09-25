import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateSignUp } from "../../services/validate";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");
  const [error, setError] = useState("");
  const { handleSignUp, handleGithubSignUp, handleGoogleSignUp } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="signup">
      <Link to={"/"} className="signup__back">
        <button className="signup__back-button">← Back</button>
      </Link>

      <div className="signup__header">
        <h1 className="signup__title">Sign up</h1>
        <Link to={"/login"}>
          <button className="signup__link">Log in</button>
        </Link>
      </div>

      <div className="signup__form">
        <div className="signup__field">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup__input"
          />
        </div>

        <div className="signup__field">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup__input"
          />
        </div>

        <div className="signup__field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup__input"
          />
        </div>

        <div className="signup__field">
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatePassword}
            onChange={(e) => setRepeatePassword(e.target.value)}
            className="signup__input"
          />
        </div>
      </div>

      <button
        className="signup__button"
        onClick={() =>
          validateSignUp(
            email,
            name,
            password,
            repeatePassword,
            setError,
            navigate,
            handleSignUp
          )
        }
      >
        Sign up
      </button>

      {error && <p className="signup__error">{error}</p>}

      <p className="signup__divider">Or sign up with social account</p>

      <div className="signup__socials">
        <button
          className="signup__social"
          onClick={() => handleGoogleSignUp(setError, navigate)}
        >
          Google
        </button>
        <button
          className="signup__social"
          onClick={() => handleGithubSignUp(setError, navigate)}
        >
          GitHub
        </button>
      </div>

      <p className="signup__terms">
        By signing up you agree to our Terms of Use and Privacy Policy
      </p>
    </div>
  );
};
