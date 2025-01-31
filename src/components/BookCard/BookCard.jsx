import { useDispatch, useSelector } from "react-redux";
import s from "./BookCard.module.css";
import { selectIsLoading } from "../../redux/books/selectors";
import { addBookToLibrary } from "../../redux/books/operations";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const handleAddToLibrary = (bookId) => {
    dispatch(addBookToLibrary(bookId));
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
        onClick={() => handleAddToLibrary(book._id)}
        disabled={isLoading}>
        {isLoading ? "Adding..." : "Add to library"}{" "}
      </button>
    </div>
  );
};

export default BookCard;
