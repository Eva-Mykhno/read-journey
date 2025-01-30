import ReactModal from "react-modal";
import { useEffect } from "react";
import s from "./ModalNav.module.css";

const sprite = "/sprite.svg";

const customStyles = {
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    left: "auto",
    bottom: "auto",
    padding: "54px",
    overflow: "auto",
    border: "none",
    backgroundColor: "var(--gray)",
    height: "100%",
    width: "53%",
  },
  overlay: {
    backgroundColor: "var(--overlay)",
    zIndex: "100",
  },
};

const ModalNav = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="ReactModal"
      ariaHideApp={false}>
      <button onClick={onClose} type="button" className={s.button}>
        <svg className={s.icon}>
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
      {children}
    </ReactModal>
  );
};

export default ModalNav;
