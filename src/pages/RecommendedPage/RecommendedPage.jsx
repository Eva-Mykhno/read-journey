import clsx from "clsx";
import Workout from "../../components/Workout/Workout";
import Dashboard from "../../components/Dashboard/Dashboard";
import Quote from "../../components/Quote/Quote";
import s from "./RecommendedPage.module.css";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";

const RecommendedPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <div>
        <Dashboard>
          <Workout />
          <div className={s.wrapQuote}>
            <Quote />
          </div>
        </Dashboard>
        <RecommendedBooks />
      </div>
    </main>
  );
};

export default RecommendedPage;
