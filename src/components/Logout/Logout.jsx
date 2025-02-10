import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/auth/operations";
import s from "./Logout.module.css";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error || "Error logging out of account", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  return (
    <button type="button" className={s.button} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default Logout;
