import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImStarHalf } from "react-icons/im";
import { Button, Spinner } from "react-bootstrap";
import { FavoritesContext } from "../Context/Favorties/FavortiesContext";
import { AuthContext } from "../Context/Auth/AuthContext";
import useToast from "../Hooks/useToast";
import Reviews from "../components/Reviews";
import { decodeToken } from "react-jwt";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState();
  const { id } = useParams();
  const showToast = useToast();
  const authContext = useContext(AuthContext);
  const isAuth = () => {
    if (authContext.state?.token) {
      const res = decodeToken(authContext.state?.token);
      return res?.role === "user" ? true : false;
    } else {
      return false;
    }
  };
  const favoritesContext = useContext(FavoritesContext);
  const updateFavorite = () => {
    console.log(isAuth());
    return (
      isAuth() &&
      favoritesContext.state?.favorites?.filter((item) => item._id === id)
        .length > 0
    );
  };
  const [isFavorite, setIsFavorite] = useState(updateFavorite());
  const [loadingFavorite, setLoadingFavorite] = useState(
    isAuth() ? favoritesContext.state?.loading : false
  );
  const BASE_URL = "http://localhost:4000/api";

  const getMovie = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie_details?id=${id}`);
      setMovie(response.data.data.movie);
      setGenres(response.data.data.movie.genres);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  useEffect(() => {
    setIsFavorite(updateFavorite());
  }, [favoritesContext.state.favorites]);

  const handleFavoriteToggle = async () => {
    if (!isAuth()) {
      showToast("error", "Please log in first", 100, 2000);
      return;
    }

    favoritesContext.dispatch({ type: "FETCH_FAVORITE_START" });
    setLoadingFavorite(true);
    try {
      if (!isFavorite) {
        // Add to favorites
        const response = await axios.post(
          `${BASE_URL}/favorites/add`,
          { ...movie },
          {
            headers: {
              Authorization: `Bearer ${authContext.state?.token}`,
            },
          }
        );

        favoritesContext.dispatch({
          type: "FETCH_FAVORTIE_SUCCESS",
          payload: response.data.favorites,
        });

        showToast("success", "Added to favorites!", 100, 2000);
        setIsFavorite(true);
        setLoadingFavorite(false);
      } else {
        // Remove from favorites
        const response = await axios.delete(
          `${BASE_URL}/favorites/delete/${id}`,
          {
            headers: {  
              Authorization: `Bearer ${authContext.state?.token}`,
            },
          }
        );

        favoritesContext.dispatch({
          type: "FETCH_FAVORTIE_SUCCESS",
          payload: response.data,
        });

        showToast("success", "Removed from favorites!", 100, 2000);
        setIsFavorite(false);
        setLoadingFavorite(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      favoritesContext.dispatch({ type: "FETCH_FAVORITE_ERROR" });
      showToast("error", "Failed to update favorites!", 100, 2000);
      setLoadingFavorite(false);
      console.error(error);
    }
  };

  return (
    <div className="min-vh-100 min-vw-100 h-100 bg-main text-white">
      <div className="container p-5">
        {error ? (
          <h1 className="text-center text-2xl text-red-400 font-bold p-3">
            {error.message}
          </h1>
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="row col-md-12 justify-content-evenly">
                <div className="col-md-4">
                  <img
                    src={movie.large_cover_image}
                    alt={movie.slug}
                    className="w-100"
                  />
                </div>
                <div className="col-md-6">
                  <h2 className="display-5 fw-bold">{movie.title}</h2>
                  <div className="d-flex items-center flex-wrap mt-2">
                    <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green">
                      {movie.year}
                    </span>
                    <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green">
                      {movie.runtime}Min
                    </span>
                    <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green">
                      <ImStarHalf />
                      {movie.rating}
                    </span>
                    {genres.map((genre, id) => (
                      <span
                        className="badge mx-1 my-2 fs-6 rounded-pill bg-green"
                        key={id}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <h3 className="fs-2 fw-bold mt-2">Synopsis</h3>
                  <p>{movie.synopsis}</p>
                  <Button
                    variant="primary"
                    size="md"
                    className="bg-green"
                    style={{ width: "100%" }}
                    onClick={() => handleFavoriteToggle()}
                    disabled={loadingFavorite}
                  >
                    {loadingFavorite && (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {isFavorite ? "Remove Favorite" : "Add Favorite"}
                  </Button>
                </div>
              </div>
              <hr className="mt-3" />
              <div className="row mt-3">
                <div className="col mb-3">
                  <div className="m-4" style={{ height: 440 }}>
                    <h3 className="fs-2 color-green fw-bold">Watch Trailer</h3>
                    <iframe
                      className="w-100 h-100"
                      src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <Reviews movieId={id} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
