import { useState } from "react";
import { useAuth } from "../jotai/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
      });

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
        // Handle login error or show an error message
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred:", error.response);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
