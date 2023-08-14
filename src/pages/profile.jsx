import useAuth from "../hooks/useAuth";

function Profile() {
  const isLoggedIn = useAuth({ authenticated: true });

  return (
    <div>
      <h2>Welcome to your profile.</h2>
      {isLoggedIn ? <p>Success</p> : <p>Nope.</p>}
    </div>
  );
}

export default Profile;
