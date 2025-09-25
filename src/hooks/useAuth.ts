import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { NavigateFunction } from "react-router-dom";

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUserId(null);
        setUserName(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(getAuth());
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        provider: "email",
      });

      navigate("/");
    } catch {
      setError("Registration error");
    }
  };

  const handleGoogleSignUp = async (
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      navigate("/");
    } catch {
      setError("Google sign up failed");
    }
  };

  const handleGithubSignUp = async (
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    const provider = new GithubAuthProvider();
    provider.addScope("user:email");
    try {
      const { user } = await signInWithPopup(auth, provider);

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      navigate("/");
    } catch {
      setError(`GitHub login failed`);
    }
  };

  const handleLogin = async (
    email: string,
    password: string,
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      setError("Incorrect login or password");
    }
  };

  const handleGoogleLogin = async (
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch {
      setError("Google login failed");
    }
  };

  const handleGithubLogin = async (
    setError: Dispatch<SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    const provider = new GithubAuthProvider();
    provider.addScope("user:email");
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch {
      setError(`GitHub login failed`);
    }
  };

  const handleForgotPassword = async (
    email: string,
    setError: Dispatch<SetStateAction<string>>,
    setMessage: Dispatch<SetStateAction<string>>
  ) => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch {
      setError("Failed to send reset email");
      setMessage("");
    }
  };

  return {
    userId,
    userName,
    loading,
    logout,
    handleSignUp,
    handleGoogleSignUp,
    handleGithubSignUp,
    handleLogin,
    handleGoogleLogin,
    handleGithubLogin,
    handleForgotPassword,
  };
};
