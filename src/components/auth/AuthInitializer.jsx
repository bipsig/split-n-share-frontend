import { useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../redux/slices/api/usersApi";

const AuthInitializer = () => {
  const token = useSelector((state) => state.auth.token);

  useGetUserDetailsQuery (undefined, {
    skip: !token, 
  })

  return null;
}

export default AuthInitializer;