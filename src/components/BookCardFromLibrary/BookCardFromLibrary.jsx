import { NavLink } from "react-router-dom";
import LazyImage from "../LazyImage/LazyImage";
import s from "./BookCardFromLibrary.module.css";

const BookCardFromLibrary = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className={s.book}>
      {book.imageUrl ? (
        <LazyImage src={book.imageUrl} alt={book.title} className={s.img} />
      ) : (
        <div className={s.noImage}>
          <picture>
            <source srcSet="/img/big-book-1x.webp 1x, /img/big-book-2x.webp 2x, /img/big-book-1x.png 1x, /img/big-book-2x.png 2x" />
            <img src="/img/big-book-1x.png" alt="No cover available" />
          </picture>
        </div>
      )}
      <h2 className={s.title}>{book.title}</h2>
      <p className={s.author}>{book.author}</p>
      <p className={s.pages}>{book.totalPages} pages</p>

      <NavLink
        to={`/reading?bookId=${book._id}`}
        onClick={onClose}
        className={s.link}>
        Start reading
      </NavLink>
    </div>
  );
};

export default BookCardFromLibrary;
