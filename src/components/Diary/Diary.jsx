import { useSelector } from "react-redux";
import s from "./Diary.module.css";

const sprite = "/sprite.svg";

const useReadingProgress = (bookId) => {
  const book = useSelector((state) =>
    state.books.userLibraryBooks.find((book) => book._id === bookId)
  );

  if (!book) return { progress: [], totalPages: 1 };

  const { progress, totalPages } = book;

  const formattedProgress = progress.map((session) => {
    const readPages = session.finishPage - session.startPage;
    const percentRead = ((session.finishPage / totalPages) * 100).toFixed(2);
    const readingTime =
      new Date(session.finishReading) - new Date(session.startReading);
    const readingTimeInMinutes = Math.floor(readingTime / 60000);
    const readingTimeInHours = readingTime / (1000 * 60 * 60);
    const speed = readingTimeInHours
      ? (readPages / readingTimeInHours).toFixed(2)
      : 0;

    return {
      id: session.startReading,
      date: new Date(session.startReading).toLocaleDateString(),
      readPages,
      percentRead,
      readingTimeInMinutes,
      speed,
    };
  });

  return { progress: formattedProgress };
};

const Diary = ({ bookId }) => {
  const { progress } = useReadingProgress(bookId);

  return (
    <ul className={s.list}>
      {progress.map(
        ({ id, date, readPages, percentRead, readingTimeInMinutes, speed }) => (
          <li key={id} className={s.item}>
            <div className={s.wrapFirst}>
              <div className={s.wrapDate}>
                <div className={s.block}></div>
                <p className={s.date}> {date}</p>
              </div>
              <p className={s.pages}>{readPages} pages</p>
            </div>

            <div className={s.wrapSecond}>
              <div className={s.wrapPercent}>
                <p className={s.percent}> {percentRead}%</p>
                <p className={s.minutes}> {readingTimeInMinutes} minutes</p>
              </div>

              <div className={s.wrapSpeed}>
                <div className={s.icons}>
                  <svg className={s.hill}>
                    <use href={`${sprite}#icon-block-hill`} />
                  </svg>
                  <svg className={s.trash}>
                    <use href={`${sprite}#icon-trash`} />
                  </svg>
                </div>
                <p className={s.speed}>{speed} pages per hour</p>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default Diary;
