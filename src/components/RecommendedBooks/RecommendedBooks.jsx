import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import {
  selectBooks,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
  selectPerPage,
  selectFilters,
} from "../../redux/books/selectors";
import Modal from "../Modal/Modal";
import {
  setCurrentPage,
  setBooksPerPage,
  setFilters,
} from "../../redux/books/slice";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";
import LazyImage from "../LazyImage/LazyImage";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import s from "./RecommendedBooks.module.css";

const sprite = "/sprite.svg";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const perPage = useSelector(selectPerPage);
  const filters = useSelector(selectFilters);
  const isRefreshing = useSelector(selectIsRefreshing);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(setFilters({ title: "", author: "" }));
  }, [dispatch]);

  useEffect(() => {
    const updateBooksPerPage = () => {
      const width = window.innerWidth;
      let booksPerPage = 2;

      if (width >= 1280) {
        booksPerPage = 10;
      } else if (width >= 768) {
        booksPerPage = 8;
      }

      if (booksPerPage !== perPage) {
        dispatch(setBooksPerPage(booksPerPage));
        dispatch(setCurrentPage(1));
      }
    };

    updateBooksPerPage();
    window.addEventListener("resize", updateBooksPerPage);

    return () => {
      window.removeEventListener("resize", updateBooksPerPage);
    };
  }, [dispatch, perPage]);

  useEffect(() => {
    if (isRefreshing) return;
    dispatch(fetchRecommendedBooks({ page: currentPage, perPage, filters }));
  }, [dispatch, currentPage, perPage, filters, isRefreshing]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <h2 className={s.title}>Recommended</h2>

        <div className={s.narrows}>
          <button className={s.narrow} onClick={goToPrevPage}>
            <svg className={`${s.icon} ${currentPage === 1 ? s.disabled : ""}`}>
              <use href={`${sprite}#icon-left`} />
            </svg>
          </button>
          <button className={s.narrow} onClick={goToNextPage}>
            <svg
              className={`${s.icon} ${
                currentPage === totalPages ? s.disabled : ""
              }`}>
              <use href={`${sprite}#icon-right`} />
            </svg>
          </button>
        </div>
      </div>
      <ul className={s.wrap}>
        {isLoading ? (
          <Loader />
        ) : books.length > 0 ? (
          books.map((book) => (
            <li
              key={book._id}
              className={s.book}
              onClick={() => openModal(book)}>
              <LazyImage
                src={book.imageUrl}
                alt={book.title}
                className={s.bookImage}
              />
              <h3 className={s.bookTitle}>{book.title}</h3>
              <p className={s.bookAuthor}>{book.author}</p>
            </li>
          ))
        ) : (
          <p className={s.noResults}>
            No books found for your search. Please, change the book title or
            book author.
          </p>
        )}
      </ul>

      {isModalOpen && selectedBook && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <BookCard book={selectedBook} closeModal={closeModal} />
        </Modal>
      )}
    </section>
  );
};

export default RecommendedBooks;
