import { useAuth } from "../jotai/store";

function Profile() {
  const [auth] = useAuth();

  if (!auth.isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Welcome, {auth.user.username}!</h2>
    </div>
  );
}

export default Profile;
