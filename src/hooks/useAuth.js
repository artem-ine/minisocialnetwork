import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/authSelector";

const useAuth = (options = {}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (
    (options.authenticated && isLoggedIn) ||
    (!options.authenticated && !isLoggedIn)
  ) {
    return true;
  }

  return false;
};

export default useAuth;
