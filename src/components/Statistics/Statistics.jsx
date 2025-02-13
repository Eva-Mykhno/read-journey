import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { selectUserLibraryBooks } from "../../redux/books/selectors";
import "react-circular-progressbar/dist/styles.css";
import s from "./Statistics.module.css";

const Statistics = ({ bookId }) => {
  const userBooks = useSelector(selectUserLibraryBooks);
  const book = userBooks.find((book) => book._id === bookId);

  if (!book) return <p>Book not found</p>;

  const calculateReadingProgress = (book) => {
    if (!book.progress || book.progress.length === 0) return 0;

    const completedSessions = book.progress.filter(
      (session) => session.finishPage !== undefined
    );

    if (completedSessions.length === 0) return 0;

    const totalReadPages = completedSessions.reduce(
      (sum, session) => sum + (session.finishPage - session.startPage),
      0
    );

    return Math.min((totalReadPages / book.totalPages) * 100, 100);
  };

  const progress = calculateReadingProgress(book);

  const totalReadPages = book.progress
    .filter((session) => session.finishPage !== undefined)
    .reduce(
      (sum, session) => sum + (session.finishPage - session.startPage),
      0
    );

  return (
    <div className={s.statistics}>
      <div className={s.wrapProgress}>
        <CircularProgressbar
          value={progress}
          text="100%"
          styles={buildStyles({
            pathColor: "var(--green)",
            trailColor: "var(--dark-gray)",
            textColor: "var(--main)",
            textSize: "18px",
            fontWeight: "700",
          })}
        />
      </div>

      <div className={s.info}>
        <div className={s.color}></div>
        <div className={s.wrapPercent}>
          <p className={s.percent}>{progress.toFixed(2)}%</p>
          <p className={s.pages}>{totalReadPages} pages read</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
