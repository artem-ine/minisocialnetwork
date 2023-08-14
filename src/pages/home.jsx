import React from "react";
import { useAuth } from "../jotai/useAuth";

function Home() {
  const { auth } = useAuth();

  return (
    <div>
      {auth.isAuthenticated ? (
        auth.user ? (
          <h2>Welcome, {auth.user.username}!</h2>
        ) : (
          <p>Welcome authenticated user!</p>
        )
      ) : (
        <p>Welcome!</p>
      )}
    </div>
  );
}

export default Home;
