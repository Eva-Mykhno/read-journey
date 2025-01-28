import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import {
  selectBooks,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
} from "../../redux/books/selectors";
import Modal from "../Modal/Modal";
import s from "./RecommendedBooks.module.css";
import { setCurrentPage } from "../../redux/books/slice";

const sprite = "/sprite.svg";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const getBooksPerPage = () => {
    const width = window.innerWidth;
    if (width < 768) return 2;
    if (width < 1024) return 8;
    return 10;
  };

  useEffect(() => {
    const booksPerPage = getBooksPerPage();
    console.log(
      "Fetching books with currentPage:",
      currentPage,
      "and booksPerPage:",
      booksPerPage
    );
    dispatch(
      fetchRecommendedBooks({ page: currentPage, perPage: booksPerPage })
    );
  }, [dispatch, currentPage]);

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

  const booksPerPage = getBooksPerPage();
  console.log("Books per page: ", booksPerPage); // debug
  const booksToShow = books.slice(0, booksPerPage);
  console.log("Books to show: ", booksToShow); // debu

  console.log(currentPage, totalPages);

  return (
    <section className={s.section}>
      <h2 className={s.title}>Recommended</h2>

      <div className={s.narrows}>
        <svg
          className={`${s.icon} ${currentPage === 1 ? s.disabled : ""}`}
          onClick={goToPrevPage}>
          <use href={`${sprite}#icon-left`} />
        </svg>
        <svg
          className={`${s.icon} ${
            currentPage === totalPages ? s.disabled : ""
          }`}
          onClick={goToNextPage}>
          <use href={`${sprite}#icon-right`} />
        </svg>
      </div>

      <div className={s.wrap}>
        {isLoading ? (
          <p>Loading...</p>
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
