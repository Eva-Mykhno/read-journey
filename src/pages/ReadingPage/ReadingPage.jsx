import s from "./ReadingPage.module.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyBook from "../../components/MyBook/MyBook";
import AddReading from "../../components/AddReading/AddReading";
import Details from "../../components/Details/Details";
import { useLocation } from "react-router-dom";

const ReadingPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const bookId = searchParams.get("bookId");

  return (
    <main className={s.page}>
      <Dashboard>
        <AddReading bookId={bookId} />
        <Details />
      </Dashboard>
      <MyBook bookId={bookId} />
    </main>
  );
};

export default ReadingPage;
