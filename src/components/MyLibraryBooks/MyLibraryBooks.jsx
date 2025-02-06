import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import s from "./MyLibraryBooks.module.css";
import { fetchUserBooks, removeBook } from "../../redux/books/operations";
import {
  selectError,
  selectIsLoading,
  selectUserLibraryBooks,
  selectStatus,
} from "../../redux/books/selectors";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import BookCardFromLibrary from "../BookCardFromLibrary/BookCardFromLibrary";
import { setStatus } from "../../redux/books/slice";
import { Formik, Field, Form } from "formik";

const sprite = "/sprite.svg";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const userLibraryBooks = useSelector(selectUserLibraryBooks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const statusFilter = useSelector(selectStatus);

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserBooks(statusFilter));
  }, [dispatch, statusFilter]);

  const handleRemoveBook = (bookId) => {
    dispatch(removeBook(bookId));
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleStatusChange = (value) => {
    dispatch(setStatus(value));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading books: {error}</div>;
  }

  return (
    <section className={s.library}>
      <Formik
        initialValues={{ status: statusFilter }}
        onSubmit={(values) => handleStatusChange(values.status)}>
        {({ setFieldValue }) => (
          <Form className={s.form}>
            <h2 className={s.title}>My Library</h2>
            <div className={s.wrapper}>
              <Field
                as="select"
                name="status"
                className={s.select}
                onChange={(e) => {
                  setFieldValue("status", e.target.value);
                  handleStatusChange(e.target.value);
                }}>
                <option value="unread" className={s.option}>
                  Unread
                </option>
                <option value="in-progress" className={s.option}>
                  In progress
                </option>
                <option value="done" className={s.option}>
                  Done
                </option>
                <option value="" className={s.option}>
                  All books
                </option>
              </Field>
              <svg className={s.down}>
                <use href={`${sprite}#icon-chevron-down`} />
              </svg>
            </div>
          </Form>
        )}
      </Formik>

      {userLibraryBooks.length > 0 ? (
        <ul className={s.list}>
          {userLibraryBooks.map((book) => (
            <li key={book._id} className={s.item}>
              <div onClick={() => openModal(book)}>
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className={s.image}
                  />
                ) : (
                  <div className={s.noImage}>
                    <picture>
                      <source srcSet="/img/book-1x.webp 1x, /img/book-2x.webp 2x, /img/book-1x.png 1x, /img/book-2x.png 2x" />
                      <img src="/img/book-1x.png" alt="No cover available" />
                    </picture>
                  </div>
                )}
              </div>
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

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <BookCardFromLibrary book={selectedBook} onClose={closeModal} />
        </Modal>
      )}
    </section>
  );
};

export default MyLibraryBooks;
