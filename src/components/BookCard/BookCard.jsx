import s from "./BookCard.module.css";

const BookCard = ({ book }) => {
  return (
    <div className={s.modalContent}>
      <img src={book.imageUrl} alt={book.title} className={s.imgModal} />
      <h3 className={s.titleModal}>{book.title}</h3>
      <p className={s.authorModal}>{book.author}</p>
      <p className={s.pages}>{book.totalPages} pages</p>
      <button className={s.button} type="button">
        Add to library
      </button>
    </div>
  );
};

export default BookCard;
