import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import {
  selectBooks,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
  selectPerPage,
} from "../../redux/books/selectors";
import Modal from "../Modal/Modal";
import s from "./RecommendedBooks.module.css";
import { setCurrentPage, setBooksPerPage } from "../../redux/books/slice";
import Loader from "../Loader/Loader";

const sprite = "/sprite.svg";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const perPage = useSelector(selectPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const updateBooksPerPage = () => {
      const width = window.innerWidth;
      let booksPerPage = width < 768 ? 2 : width < 1280 ? 8 : 10;
      dispatch(setBooksPerPage(booksPerPage));
    };

    updateBooksPerPage();

    window.addEventListener("resize", updateBooksPerPage);
    return () => window.removeEventListener("resize", updateBooksPerPage);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

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

  const booksToShow = books.slice(0, perPage);

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <h2 className={s.title}>Recommended</h2>

        <div className={s.narrows}>
          <div className={s.narrow}>
            <svg
              className={`${s.icon} ${currentPage === 1 ? s.disabled : ""}`}
              onClick={goToPrevPage}>
              <use href={`${sprite}#icon-left`} />
            </svg>
          </div>
          <div className={s.narrow}>
            <svg
              className={`${s.icon} ${
                currentPage === totalPages ? s.disabled : ""
              }`}
              onClick={goToNextPage}>
              <use href={`${sprite}#icon-right`} />
            </svg>
          </div>
        </div>
      </div>
      <div className={s.wrap}>
        {isLoading ? (
          <Loader />
        ) : (
          booksToShow.map((book) => (
            <div
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
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className={s.modalContent}>
            <h3>{selectedBook.title}</h3>
            <p>{selectedBook.author}</p>
            <p>{selectedBook.totalPages} pages</p>
            <button className={s.addToLibraryBtn}>Add to library</button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default RecommendedBooks;
