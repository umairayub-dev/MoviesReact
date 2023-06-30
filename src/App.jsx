import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import Navbar from './components/MyNavbar';
import MoviesPage from './Pages/MoviesPage';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/Auth/AuthContext";
import ToastContainer from "./components/ToastContainer";

const App = () => {
  const { state } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={state.currentUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={state.currentUser ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App