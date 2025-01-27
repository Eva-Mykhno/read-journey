import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute.jsx";

const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const Layout = lazy(() => import("../Layout/Layout"));
const RecommendedPage = lazy(() =>
  import("../../pages/RecommendedPage/RecommendedPage")
);
const MyLibraryPage = lazy(() =>
  import("../../pages/MyLibraryPage/MyLibraryPage")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
          <Route path="/recommended" element={<RecommendedPage />} />
          <Route path="/library" element={<MyLibraryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
