import ReactModal from "react-modal";
import { useEffect } from "react";
import s from "./Modal.module.css";

const sprite = "/sprite.svg";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    right: "50%",
    left: "auto",
    bottom: "auto",
    transform: "translate(-50% -50%)",
    padding: "40px",
    overflow: "auto",

    border: "none",
    backgroundColor: "var(--dark-gray)",
  },
  overlay: {
    backgroundColor: "var(--overlay)",
    zIndex: "100",
  },
};

ReactModal.setAppElement("#root");

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
