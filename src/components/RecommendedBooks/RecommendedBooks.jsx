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
import s from "./RecommendedBooks.module.css";
import { setCurrentPage, setBooksPerPage } from "../../redux/books/slice";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";

const sprite = "/sprite.svg";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const perPage = useSelector(selectPerPage);
  const filters = useSelector(selectFilters);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      dispatch(setBooksPerPage(2));
    } else if (width < 1280) {
      dispatch(setBooksPerPage(8));
    } else {
      dispatch(setBooksPerPage(10));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page: currentPage, perPage, filters }));
  }, [dispatch, currentPage, perPage, filters]);

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
          <button className={s.narrow}>
            <svg
              className={`${s.icon} ${currentPage === 1 ? s.disabled : ""}`}
              onClick={goToPrevPage}>
              <use href={`${sprite}#icon-left`} />
            </svg>
          </button>
          <button type="button" className={s.narrow}>
            <svg
              className={`${s.icon} ${
                currentPage === totalPages ? s.disabled : ""
              }`}
              onClick={goToNextPage}>
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
              <img
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
          <BookCard book={selectedBook} />
        </Modal>
      )}
    </section>
  );
};

export default RecommendedBooks;
