import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import s from "./MyLibraryBooks.module.css";
import { fetchUserLibrary, removeBook } from "../../redux/books/operations";
import {
  selectError,
  selectIsLoading,
  selectUserLibraryBooks,
} from "../../redux/books/selectors";
import Loader from "../Loader/Loader";

const sprite = "/sprite.svg";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const userLibraryBooks = useSelector(selectUserLibraryBooks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchUserLibrary());
  }, [dispatch]);

  const handleRemoveBook = (bookId) => {
    dispatch(removeBook(bookId));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading books: {error}</div>;
  }

  return (
    <section className={s.library}>
      <h2 className={s.title}>My Library</h2>
      {userLibraryBooks.length > 0 ? (
        <ul className={s.list}>
          {userLibraryBooks.map((book) => (
            <li key={book._id} className={s.item}>
              <img src={book.imageUrl} alt={book.title} className={s.image} />
              <h3 className={s.bookTitle}>{book.title}</h3>
              <p className={s.author}>{book.author}</p>
              <button
                type="button"
                className={s.button}
                onClick={() => handleRemoveBook(book._id)}>
                <svg className={s.icon}>
                  <use href={`${sprite}#icon-trash`} />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={s.wrap}>
          <div className={s.wrapImg}>
            <picture>
              <source srcSet="/img/big-books-1x.webp 1x, /img/big-books-2x.webp 2x, /img/big-books-1x.png 1x, /img/big-books-2x.png 2x" />
              <img
                src="/img/big-books-1x.png"
                alt="stack of books"
                className={s.img}
              />
            </picture>
          </div>
          <p className={s.text}>
            To start training,{" "}
            <span className={s.span}>add some of your books</span> or from the
            recommended ones
          </p>
        </div>
      )}
    </section>
  );
};

export default MyLibraryBooks;
