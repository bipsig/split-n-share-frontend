import { useDispatch, useSelector } from "react-redux"
import { selectCurrentToken, selectIsAuthenticated } from "../redux/slices/auth/authSelectors";

const useAuth = () => {
  const dispatch = useDispatch();

  const authToken = useSelector(selectCurrentToken);
  const authIsAuthenticated = useSelector(selectIsAuthenticated);

  return {
    authToken,
    authIsAuthenticated,
  };
}

export default useAuth;