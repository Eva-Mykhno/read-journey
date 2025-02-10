import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { refresh } from "../../redux/auth/operations";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/auth/selectors";

const Layout = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!isRefreshing && !isLoggedIn && user?.token) {
      dispatch(refresh());
    }
  }, [dispatch, isRefreshing, isLoggedIn, user?.token]);

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
