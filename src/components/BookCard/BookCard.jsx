import { useDispatch, useSelector } from "react-redux";
import s from "./BookCard.module.css";
import {
  addBookToLibrary,
  fetchUserLibrary,
} from "../../redux/books/operations";
import { selectUserLibraryBooks } from "../../redux/books/selectors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookCard = ({ book, closeModal }) => {
  const dispatch = useDispatch();
  const userLibraryBooks = useSelector(selectUserLibraryBooks);

  const handleAddToLibrary = async (bookId) => {
    await dispatch(fetchUserLibrary());
    const bookExists = userLibraryBooks.some((b) => b.title === book.title);

    if (bookExists) {
      toast.error("This book is already in your library", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    await dispatch(addBookToLibrary(bookId));
    closeModal();
    toast.success("The book has been successfully added to your library", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div className={s.book}>
      <img src={book.imageUrl} alt={book.title} className={s.img} />
      <h3 className={s.title}>{book.title}</h3>
      <p className={s.author}>{book.author}</p>
      <p className={s.pages}>{book.totalPages} pages</p>
      <button
        className={s.buttonAdd}
        type="button"
        onClick={() => handleAddToLibrary(book._id)}>
        Add to library
      </button>
    </div>
  );
};

export default BookCard;
