import { useDispatch, useSelector } from "react-redux"
import { authenticated, error, loading, message, token } from "../redux/slices/auth/authSelectors";
import { loginUser } from "../redux/slices/auth/authThunks";

const useAuth = () => {
  const dispatch = useDispatch();

  const authToken = useSelector(token);
  const authIsAuthenticated = useSelector(authenticated);
  const authLoading = useSelector(loading);
  const authError = useSelector(error);
  const authMessage = useSelector(message);

  const authLogin = (credentials) => dispatch(loginUser(credentials));

  return {
    authToken,
    authIsAuthenticated,
    authLoading,
    authError,
    authMessage,
    authLogin
  };
}

export default useAuth;