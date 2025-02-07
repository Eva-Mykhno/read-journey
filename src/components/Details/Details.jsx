import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInfoAboutBook } from "../../redux/books/operations";
import Diary from "../Diary/Diary";
import Statistics from "../Statistics/Statistics";
import BookRead from "../BookRead/BookRead";
import s from "./Details.module.css";
import clsx from "clsx";

const sprite = "/sprite.svg";

const Details = ({ bookId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("unread");
  const [selectedComponent, setSelectedComponent] = useState("diary");

  const bookDetails = useSelector((state) =>
    state.books.userLibraryBooks.find((book) => book._id === bookId)
  );

  useEffect(() => {
    if (bookId) {
      dispatch(fetchInfoAboutBook({ bookId }));
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    if (bookDetails) {
      setStatus(bookDetails.status);
    }
  }, [bookDetails]);

  useEffect(() => {
    if (status === "done") {
      setIsModalOpen(true);
    }
  }, [status]);

  const closeModal = () => setIsModalOpen(false);

  const handleIconClick = (component) => {
    setSelectedComponent(component);
  };

  const title = selectedComponent === "diary" ? "Diary" : "Statistics";

  return (
    <section className={s.section}>
      {status === "unread" ? (
        <>
          <h2 className={s.title}>Progress</h2>
          <p className={s.text}>
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
          <div className={s.wrapStar}>
            <picture>
              <source srcSet="/img/star-1x.webp 1x, /img/star-2x.webp 2x, /img/star-1x.png 1x, /img/star-2x.png 2x" />
              <img
                src="/img/star-1x.png"
                alt="picture of a star"
                className={s.star}
              />
            </picture>
          </div>
        </>
      ) : (
        <>
          <div className={s.wrapProgress}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.icons}>
              <svg
                className={clsx(s.icon, {
                  [s.active]: selectedComponent === "diary",
                })}
                onClick={() => handleIconClick("diary")}>
                <use href={`${sprite}#icon-hourglass`} />
              </svg>
              <svg
                className={clsx(s.icon, {
                  [s.active]: selectedComponent === "statistics",
                })}
                onClick={() => handleIconClick("statistics")}>
                <use href={`${sprite}#icon-pie-chart`} />
              </svg>
            </div>
          </div>

          {selectedComponent === "diary" && <Diary bookId={bookId} />}
          {selectedComponent === "statistics" && <Statistics />}
          {status === "done" && (
            <BookRead isOpen={isModalOpen} onClose={closeModal} />
          )}
        </>
      )}
    </section>
  );
};

export default Details;
