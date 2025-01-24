import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import s from "./Logout.module.css";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <button type="button" className={s.button} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default Logout;
