import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import s from "./Diary.module.css";
import { deleteReadingSession } from "../../redux/books/operations";

const sprite = "/sprite.svg";

const calculateSessionData = (
  startReading,
  finishPage,
  startPage,
  finishReading,
  totalPages
) => {
  if (!finishReading || finishPage < startPage) {
    return { percentRead: "0", readingTimeInMinutes: 0, speed: 0 };
  }

  const readPages = finishPage - startPage;
  const percentRead = ((finishPage / totalPages) * 100).toFixed(2);
  const readingTime = new Date(finishReading) - new Date(startReading);
  const readingTimeInMinutes = Math.floor(readingTime / 60000);
  const readingTimeInHours = readingTime / (1000 * 60 * 60);
  const speed = readingTimeInHours
    ? Math.round(readPages / readingTimeInHours)
    : 0;

  return {
    readPages,
    percentRead,
    readingTimeInMinutes,
    speed,
  };
};

const Diary = ({ bookId }) => {
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    state.books.userLibraryBooks.find((book) => book._id === bookId)
  );

  if (!book) return null;

  const { progress, totalPages } = book;

  const handleDeleteSession = (readingId) => {
    dispatch(deleteReadingSession({ bookId, readingId }));
  };

  const groupedSessions = progress.reduce((acc, session) => {
    if (session.finishReading) {
      const date = new Date(session.finishReading).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(session);
    }
    return acc;
  }, {});

  const sessionsByDate = Object.keys(groupedSessions).map((date) => {
    const sessions = groupedSessions[date];
    const totalReadPages = sessions.reduce(
      (sum, session) => sum + (session.finishPage - session.startPage),
      0
    );
    const totalReadingTime = sessions.reduce((sum, session) => {
      return (
        sum + (new Date(session.finishReading) - new Date(session.startReading))
      );
    }, 0);

    const totalReadingTimeInMinutes = Math.floor(totalReadingTime / 60000);
    const totalReadingTimeInHours = totalReadingTime / (1000 * 60 * 60);
    const averageSpeed = totalReadingTimeInHours
      ? Math.round(totalReadPages / totalReadingTimeInHours)
      : 0;

    const lastSession = sessions[sessions.length - 1];
    const isLastSession =
      new Date(lastSession.finishReading).toLocaleDateString() ===
      new Date().toLocaleDateString();

    return {
      date,
      totalReadPages,
      totalReadingTimeInMinutes,
      averageSpeed,
      sessions,
      totalPages,
      isLastSession,
    };
  });

  return (
    <ul className={s.list}>
      {sessionsByDate.map(
        ({ date, totalReadPages, sessions, totalPages, isLastSession }) => {
          return (
            <li key={date} className={s.item}>
              <div className={s.wrapper}>
                <div className={s.wrapDate}>
                  <div
                    className={clsx(s.block, {
                      [s.lastBlock]: isLastSession,
                    })}></div>
                  <p
                    className={clsx(s.date, {
                      [s.lastDate]: isLastSession,
                    })}>
                    {date}
                  </p>
                </div>
                <p className={s.pages}>{totalReadPages} pages</p>
              </div>

              <ul className={s.listSession}>
                {sessions.map(
                  ({
                    startReading,
                    finishPage,
                    startPage,
                    finishReading,
                    _id,
                  }) => {
                    const { percentRead, readingTimeInMinutes, speed } =
                      calculateSessionData(
                        startReading,
                        finishPage,
                        startPage,
                        finishReading,
                        totalPages
                      );

                    return (
                      <li key={startReading} className={s.itemSession}>
                        <div className={s.wrapPercent}>
                          <p className={s.percent}>{percentRead}%</p>
                          <p className={s.minutes}>
                            {readingTimeInMinutes} minutes
                          </p>
                        </div>
                        <div className={s.wrapSpeed}>
                          <div className={s.icons}>
                            <svg className={s.hill}>
                              <use href={`${sprite}#icon-block-hill`} />
                            </svg>
                            <svg
                              className={s.trash}
                              onClick={() => handleDeleteSession(_id)}>
                              <use href={`${sprite}#icon-trash`} />
                            </svg>
                          </div>
                          <p className={s.speed}>{speed} pages per hour</p>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default Diary;
