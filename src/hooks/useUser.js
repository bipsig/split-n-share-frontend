import { useSelector } from "react-redux";
import { currentUsername, userData } from "../redux/slices/user/userSelectors";

const useUser = () => {
  const username = useSelector(currentUsername);
  const user = useSelector(userData);

  return {
    username,
    user
  }
}

export default useUser;