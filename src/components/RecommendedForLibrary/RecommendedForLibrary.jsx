import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import { selectBooks, selectIsLoading } from "../../redux/books/selectors";
import Loader from "../Loader/Loader";
import LazyImage from "../LazyImage/LazyImage";
import s from "./RecommendedForLibrary.module.css";

const sprite = "/sprite.svg";

const getRandomBooks = (books, count) => {
  if (books.length <= count) return books;
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const RecommendedForLibrary = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectIsLoading);
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 3) + 1;
    dispatch(
      fetchRecommendedBooks({ page: randomPage, perPage: 10, filters: {} })
    );
  }, [dispatch]);

  useEffect(() => {
    if (books.length > 0) {
      setRandomBooks(getRandomBooks(books, 3));
    }
  }, [books]);

  return (
    <section className={s.section}>
      <h2 className={s.title}>Recommended books</h2>

      {isLoading && <Loader />}
      {!isLoading && randomBooks.length > 0 && (
        <ul className={s.list}>
          {randomBooks.map((book) => (
            <li key={book._id} className={s.book}>
              <LazyImage
                src={book.imageUrl}
                alt={book.title}
                className={s.img}
              />
              <h3 className={s.bookTitle}>{book.title}</h3>
              <p className={s.author}>{book.author}</p>
            </li>
          ))}
        </ul>
      )}
      <NavLink to="/recommended" className={s.links}>
        <p className={s.link}>Home</p>
        <svg className={s.icon}>
          <use href={`${sprite}#icon-narrow`} />
        </svg>
      </NavLink>
    </section>
  );
};

export default RecommendedForLibrary;
