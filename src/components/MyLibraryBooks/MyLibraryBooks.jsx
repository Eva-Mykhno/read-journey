import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
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

import LazyImage from "../LazyImage/LazyImage";
import Select from "react-select";
import s from "./MyLibraryBooks.module.css";

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

  const handleStatusChange = (selectedOption) => {
    dispatch(setStatus(selectedOption.value));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading books: {error}</div>;
  }

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      width: "155px",
      height: "50px",
      borderRadius: "12px",
      padding: "0 14px",
      fontSize: "14px",
      border: "1px solid var(--library-recommend)",
      color: "var(--main)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "none",
      cursor: "pointer",
      zIndex: 10,
      ":focus": {
        outline: "none",
        borderColor: "var(--library-recommend)",
      },
      ":focus-visible": {
        outline: "none",
        borderColor: "var(--library-recommend)",
      },
      ":hover": {
        borderColor: "var(--library-recommend)",
      },
    }),
    menu: (base) => ({
      ...base,
      marginTop: "8px",
      width: "155px",
      height: "121px",
      borderRadius: "12px",
      backgroundColor: "var(--gray)",
      paddingTop: "11px",
      paddingBottom: "11px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--gray)"
        : state.isFocused
        ? "var(--main)"
        : "var(--gray)",
      color: state.isSelected ? "var(--main)" : "var(--light-gray)",
      padding: "3px 14px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s",
      borderRadius: "none",
      ":active": {
        backgroundColor: "var(--gray)",
        color: "var(--main)",
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "var(--main)",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      transition: "transform 0.3s ease",
      fontSize: "16px",
      "&:hover": {
        color: "var(--main)",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--main)",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--main)",
    }),
  };

  const options = [
    { value: "unread", label: "Unread" },
    { value: "in-progress", label: "In progress" },
    { value: "done", label: "Done" },
    { value: "", label: "All books" },
  ];

  return (
    <section className={s.library}>
      <Formik
        initialValues={{ status: statusFilter || "" }}
        onSubmit={(values) => handleStatusChange(values.status)}>
        {({ setFieldValue }) => (
          <Form className={s.form}>
            <h2 className={s.title}>My Library</h2>
            <div className={s.wrapper}>
              <Field name="status">
                {({ field }) => (
                  <Select
                    {...field}
                    value={options.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) => {
                      setFieldValue("status", selectedOption.value);
                      handleStatusChange(selectedOption);
                    }}
                    options={options}
                    styles={customSelectStyles}
                    classNamePrefix="custom-select"
                  />
                )}
              </Field>
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
                  <LazyImage
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
