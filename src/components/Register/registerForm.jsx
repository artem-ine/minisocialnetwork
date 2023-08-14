import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../../jotai/store";
import useErrorHandler from "../../hooks/errorHandler";

function RegisterForm() {
  const [, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, showError, clearError } = useErrorHandler();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          isAuthenticated: true,
          user: data.user,
          token: data.jwt,
        }));
        navigate("/profile");
      } else {
        const errorMessage = data.message || "Registration failed.";
        showError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred during registration.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Register</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default RegisterForm;
