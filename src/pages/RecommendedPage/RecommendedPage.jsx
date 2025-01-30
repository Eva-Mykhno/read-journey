import clsx from "clsx";
import Workout from "../../components/Workout/Workout";
import Dashboard from "../../components/Dashboard/Dashboard";
import Quote from "../../components/Quote/Quote";
import s from "./RecommendedPage.module.css";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";
import FiltersRecommended from "../../components/FiltersRecommended/FiltersRecommended";

const RecommendedPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <div>
        <Dashboard>
          <FiltersRecommended />
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
