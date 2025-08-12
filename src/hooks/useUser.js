import { useSelector } from "react-redux";
import { currentUsername } from "../redux/slices/user/userSelectors";

const useUser = () => {
  const username = useSelector(currentUsername);

  return {
    username
  }
}

export default useUser;