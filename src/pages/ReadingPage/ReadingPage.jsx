import { useLocation } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyBook from "../../components/MyBook/MyBook";
import AddReading from "../../components/AddReading/AddReading";
import Details from "../../components/Details/Details";
import s from "./ReadingPage.module.css";

const ReadingPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const bookId = searchParams.get("bookId");

  return (
    <main className={s.page}>
      <Dashboard>
        <AddReading bookId={bookId} />
        <Details bookId={bookId} />
      </Dashboard>
      <MyBook bookId={bookId} />
    </main>
  );
};

export default ReadingPage;
