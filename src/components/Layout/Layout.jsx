// import { Outlet } from "react-router-dom";
// import Header from "../Header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { refresh } from "../../redux/auth/operations";
// import { useEffect } from "react";
// import { selectIsRefreshing } from "../../redux/auth/selectors";

// const Layout = () => {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector(selectIsRefreshing);

//   useEffect(() => {
//     if (!isRefreshing) {
//       dispatch(refresh());
//     }
//   }, [dispatch, isRefreshing]);
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../redux/auth/operations";
import { useEffect } from "react";
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
    // Проверяем, существует ли объект user и есть ли у него token
    if (!isRefreshing && !isLoggedIn && user?.token) {
      dispatch(refresh());
    }
  }, [dispatch, isRefreshing, isLoggedIn, user?.token]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
