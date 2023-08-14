import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../jotai/useAuth";

const Navbar = () => {
  const { auth, handleLogout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!auth.isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
