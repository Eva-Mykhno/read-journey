import { useState } from "react";
import Logout from "../Logout/Logout";
import UserBar from "../UserBar/UserBar";
import UserNav from "../UserNav/UserNav";
import ModalNav from "../ModalNav/ModalNav";
import s from "./Header.module.css";

const sprite = "/sprite.svg";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={s.header}>
      <div className={s.wrapLogo}>
        <svg className={s.logo}>
          <use href={`${sprite}#icon-logo`} />
        </svg>
        <p className={s.text}>read journey</p>
      </div>
      <div className={s.wrapMobile}>
        <UserBar />
        <button onClick={() => openModal()} type="button" className={s.button}>
          <svg className={s.menu}>
            <use href={`${sprite}#icon-menu`} />
          </svg>
        </button>

        <ModalNav isOpen={isModalOpen} onClose={closeModal}>
          <UserNav />
        </ModalNav>
      </div>

      <div className={s.tabletNav}>
        <UserNav />
        <div className={s.wrapTablet}>
          <UserBar />
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
