import React from "react";
import { useAuth } from "../jotai/useAuth"; // Import the updated useAuth hook

function Logout() {
  const { handleLogout } = useAuth(); // Use the updated useAuth hook

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
}

export default Logout;
