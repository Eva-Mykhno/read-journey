import { useSelector } from "react-redux";
import {
  selectReadingBook,
  selectActiveProgressByBookId,
  selectTimeLeftToReadByBookId,
} from "../../redux/books/selectors";
import LazyImage from "../LazyImage/LazyImage";
import s from "./MyBook.module.css";

const sprite = "/sprite.svg";

const MyBook = ({ bookId }) => {
  const book = useSelector((state) => selectReadingBook(state, bookId));
  const activeProgress = useSelector((state) =>
    selectActiveProgressByBookId(state, bookId)
  );
  const timeLeft = useSelector((state) =>
    selectTimeLeftToReadByBookId(state, bookId)
  );

  if (!book) return null;

  const isReadingActive = Boolean(activeProgress);

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <h2 className={s.title}>My reading</h2>
        {timeLeft && (
          <p className={s.timeLeft}>
            {timeLeft.hours} hours and {timeLeft.minutes} minutes left
          </p>
        )}
      </div>

      <div className={s.book}>
        {book.imageUrl ? (
          <LazyImage src={book.imageUrl} alt={book.title} className={s.image} />
        ) : (
          <div className={s.noImage}>
            <picture>
              <source srcSet="/img/big-book-1x.webp 1x, /img/big-book-2x.webp 2x, /img/big-book-1x.png 1x, /img/big-book-2x.png 2x" />
              <img src="/img/big-book-1x.png" alt="No cover available" />
            </picture>
          </div>
        )}
        <h2 className={s.bookTitle}>{book.title}</h2>
        <p className={s.author}>{book.author}</p>
      </div>

      {!isReadingActive && (
        <svg className={s.icon}>
          <use href={`${sprite}#icon-block-big`} />
        </svg>
      )}

      {isReadingActive && (
        <svg className={s.icon}>
          <use href={`${sprite}#icon-block`} />
        </svg>
      )}
    </section>
  );
};

export default MyBook;
