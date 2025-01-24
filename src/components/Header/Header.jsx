import UserBar from "../UserBar/UserBar";
import UserNav from "../UserNav/UserNav";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <UserBar />
      <UserNav />
    </header>
  );
};

export default Header;
