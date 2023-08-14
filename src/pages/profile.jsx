import { useAuth } from "../jotai/useAuth"; // Import the updated useAuth hook

function Profile() {
  const { auth } = useAuth();

  return (
    <div>
      {auth.isAuthenticated ? (
        auth.user ? (
          <h2>Welcome to your profile, {auth.user.username}!</h2>
        ) : (
          <p>Profile of authenticated user!</p>
        )
      ) : (
        <p>No!</p>
      )}
    </div>
  );
}

export default Profile;
