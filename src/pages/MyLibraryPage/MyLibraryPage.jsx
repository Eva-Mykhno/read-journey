import AddBook from "../../components/AddBook/AddBook";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import RecommendedForLibrary from "../../components/RecommendedForLibrary/RecommendedForLibrary";
import s from "./MyLibraryPage.module.css";

const MyLibraryPage = () => {
  return (
    <main className={s.page}>
      <Dashboard>
        <AddBook />
        <RecommendedForLibrary />
      </Dashboard>
      <MyLibraryBooks />
    </main>
  );
};

export default MyLibraryPage;
