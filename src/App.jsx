import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import Navbar from "./components/MyNavbar";
import MoviesPage from "./Pages/MoviesPage";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/Auth/AuthContext";
import ToastContainer from "./components/ToastContainer";
import { decodeToken } from "react-jwt";
import AdminPage from "./Pages/AdminPage";

const App = () => {
  const { state } = useContext(AuthContext);

  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      return res?.role;
    }
  };
  const currentToken = decodeUser(state?.token);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route
          path="/favorites"
          element={currentToken ? <FavoritesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={currentToken ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={currentToken ? <Navigate to="/" /> : <SignupPage />}
        />

        <Route
          path="/admin-panel"
          element={currentToken === "admin" ? <AdminPage /> : <NotFoundPage />}
        />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
