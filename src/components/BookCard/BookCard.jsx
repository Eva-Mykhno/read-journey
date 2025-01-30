import s from "./BookCard.module.css";

const BookCard = ({ book }) => {
  return (
    <div className={s.book}>
      <img src={book.imageUrl} alt={book.title} className={s.img} />
      <h3 className={s.title}>{book.title}</h3>
      <p className={s.author}>{book.author}</p>
      <p className={s.pages}>{book.totalPages} pages</p>
      <button className={s.buttonAdd} type="button">
        Add to library
      </button>
    </div>
  );
};

export default BookCard;
