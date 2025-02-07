import Modal from "../Modal/Modal";
import s from "./BookRead.module.css";

const BookRead = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.wrap}>
        <picture>
          <source srcSet="/img/big-books-1x.webp 1x, /img/big-books-2x.webp 2x, /img/big-books-1x.png 1x, /img/big-books-2x.png 2x" />
          <img
            src="/img/big-books-1x.png"
            alt="stack of books"
            className={s.books}
          />
        </picture>

        <h3 className={s.title}>The book is read</h3>
        <p className={s.text}>
          It was an <span className={s.span}>exciting journey</span>, where each
          page revealed new horizons, and the characters became inseparable
          friends.
        </p>
      </div>
    </Modal>
  );
};

export default BookRead;
