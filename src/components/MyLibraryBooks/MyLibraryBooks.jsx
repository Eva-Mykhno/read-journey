// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import s from "./MyLibraryBooks.module.css";
// import { fetchUserLibrary, removeBook } from "../../redux/books/operations";
// import {
//   selectError,
//   selectIsLoading,
//   selectUserLibraryBooks,
// } from "../../redux/books/selectors";
// import Loader from "../Loader/Loader";
// import { useState } from "react";
// import Modal from "../Modal/Modal";
// import BookCardFromLibrary from "../BookCardFromLibrary/BookCardFromLibrary";

// const sprite = "/sprite.svg";

// const MyLibraryBooks = () => {
//   const dispatch = useDispatch();
//   const userLibraryBooks = useSelector(selectUserLibraryBooks);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);

//   const [selectedBook, setSelectedBook] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUserLibrary());
//   }, [dispatch]);

//   const handleRemoveBook = (bookId) => {
//     dispatch(removeBook(bookId));
//   };

//   const openModal = (book) => {
//     setSelectedBook(book);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedBook(null);
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>Error loading books: {error}</div>;
//   }

//   return (
//     <section className={s.library}>
//       <h2 className={s.title}>My Library</h2>
//       <div className={s.select}></div>
//       {userLibraryBooks.length > 0 ? (
//         <ul className={s.list}>
//           {userLibraryBooks.map((book) => (
//             <li key={book._id} className={s.item}>
//               <div onClick={() => openModal(book)}>
//                 {book.imageUrl ? (
//                   <img
//                     src={book.imageUrl}
//                     alt={book.title}
//                     className={s.image}
//                   />
//                 ) : (
//                   <div className={s.noImage}>
//                     <picture>
//                       <source srcSet="/img/book-1x.webp 1x, /img/book-2x.webp 2x, /img/book-1x.png 1x, /img/book-2x.png 2x" />
//                       <img src="/img/book-1x.png" alt="No cover available" />
//                     </picture>
//                   </div>
//                 )}
//               </div>
//               <h3 className={s.bookTitle}>{book.title}</h3>
//               <p className={s.author}>{book.author}</p>
//               <button
//                 type="button"
//                 className={s.button}
//                 onClick={() => handleRemoveBook(book._id)}>
//                 <svg className={s.icon}>
//                   <use href={`${sprite}#icon-trash`} />
//                 </svg>
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className={s.wrap}>
//           <div className={s.wrapImg}>
//             <picture>
//               <source srcSet="/img/big-books-1x.webp 1x, /img/big-books-2x.webp 2x, /img/big-books-1x.png 1x, /img/big-books-2x.png 2x" />
//               <img
//                 src="/img/big-books-1x.png"
//                 alt="stack of books"
//                 className={s.img}
//               />
//             </picture>
//           </div>
//           <p className={s.text}>
//             To start training,{" "}
//             <span className={s.span}>add some of your books</span> or from the
//             recommended ones
//           </p>
//         </div>
//       )}

//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <BookCardFromLibrary book={selectedBook} onClose={closeModal} />
//         </Modal>
//       )}
//     </section>
//   );
// };

// export default MyLibraryBooks;

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import s from "./MyLibraryBooks.module.css";
import { fetchUserLibrary, removeBook } from "../../redux/books/operations";
import {
  selectError,
  selectIsLoading,
  selectUserLibraryBooks,
  selectFilters,
} from "../../redux/books/selectors";
import Loader from "../Loader/Loader";
import { useState } from "react";
import Modal from "../Modal/Modal";
import BookCardFromLibrary from "../BookCardFromLibrary/BookCardFromLibrary";
import { setStatus } from "../../redux/books/slice"; // Импортируем экшн setStatus

const sprite = "/sprite.svg";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const userLibraryBooks = useSelector(selectUserLibraryBooks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters); // Получаем фильтры из стейта

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserLibrary());
  }, [dispatch]);

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

  const handleStatusChange = (event) => {
    dispatch(setStatus(event.target.value)); // Обновляем статус в фильтре
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading books: {error}</div>;
  }

  // Фильтруем книги по статусу
  const filteredBooks = userLibraryBooks.filter((book) => {
    return filters.status ? book.status === filters.status : true;
  });

  return (
    <section className={s.library}>
      <h2 className={s.title}>My Library</h2>
      <div className={s.select}>
        <label htmlFor="status" className={s.label}>
          Filter by Status:
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={handleStatusChange}
          className={s.statusSelect}>
          <option value="">All books</option>
          <option value="unread">Unread</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      {filteredBooks.length > 0 ? (
        <ul className={s.list}>
          {filteredBooks.map((book) => (
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
