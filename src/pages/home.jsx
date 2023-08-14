import { useSelector } from "react-redux";

const Home = () => {
  const username = useSelector((state) => state.username);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <div>{isAuthenticated ? <h1>Hello {username}</h1> : <h1>Hello</h1>}</div>
  );
};

export default Home;
