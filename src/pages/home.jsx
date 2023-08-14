import { useAuth } from "../jotai/store";

function Home() {
  const [auth] = useAuth();

  if (!auth.isAuthenticated) {
    return <p>Welcome!</p>;
  }

  return (
    <div>
      <h2>Welcome, {auth.user.username}!</h2>
    </div>
  );
}

export default Home;
