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
import AdminPage from "./Admin";

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

  const getRoutes = (role) => {
    if (role === "admin") {
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/admin-panel/dashboard" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/admin-panel/*" element={<AdminPage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      );
    } else {
      return (
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
          <Route path="/admin-panel/*" element={<Navigate to="/" />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      );
    }
  };
  return (
    <>
      <Navbar />
      {getRoutes(currentToken)}
      <ToastContainer />
    </>
  );
};

export default App;
