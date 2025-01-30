import ReactModal from "react-modal";
import { useEffect } from "react";
import s from "./Modal.module.css";

const sprite = "/sprite.svg";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "40px",
    overflow: "auto",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "var(--dark-gray)",
    maxWidth: "100vh",
  },
  overlay: {
    backgroundColor: "var(--overlay)",
    zIndex: "100",
  },
};

const Modal = ({ isOpen, onClose, children }) => {
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

export default Modal;
