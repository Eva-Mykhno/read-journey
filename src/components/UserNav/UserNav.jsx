import clsx from "clsx";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout";
import s from "./UserNav.module.css";

const UserNav = () => {
  const buildLinkClassName = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <section className={s.wrapper}>
      <nav className={s.menu}>
        <NavLink to="/recommended" className={buildLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/library" className={buildLinkClassName}>
          My Library
        </NavLink>
      </nav>
      <div className={s.logout}>
        <Logout />
      </div>
    </section>
  );
};

export default UserNav;
