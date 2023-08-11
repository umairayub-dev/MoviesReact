import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Spinner } from "react-bootstrap";
import MyPagination from "../../components/MyPagination";
import MovieModal from "../components/MovieModal";
import MovieTable from "../components/MovieTable";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth/AuthContext";
import useToast from "../../Hooks/useToast";

const MoviesPage = () => {
  const { state } = useContext(AuthContext);
  const showToast = useToast();
  const [movies, setMovies] = useState({ totalItems: 0, movies: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sortConfig, setSortConfig] = useState({
    key: "date_added",
    direction: "desc",
  });
  const BASE_URL = "https://victorious-lion-clothes.cyclic.cloud/api/movies";

  const buildApiUrl = (page, limit) => {
    return `${BASE_URL}?page=${page || 1}&limit=${limit}`;
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const handleShowModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie({});
    setShowModal(false);
  };

  const handleSaveMovie = async (movie) => {
    // Handle saving/updating movie logic here
    console.log("Saving/Updating Movie:", movie);
    try {
      await axios
        .patch(
          "https://victorious-lion-clothes.cyclic.cloud/api/update-movie",
          {
            movieId: movie._id,
            movie: movie,
          },
          {
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
          }
        )
        .then((response) => {
          setMovies({
            totalItems: response.data.movies.length,
            movies: response.data.movies,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const headers = {
    headers: {
      Authorization: `Bearer ${state?.token}`,
    },
  };
  const getMovies = async () => {
    console.log("HELLO");
    setIsLoading(true);
    try {
      const response = await axios.get(buildApiUrl(currentPage, limit));
      if (response.status === 200) {
        setMovies({
          totalItems: response.data.data.movie_count,
          movies: response.data.data.movies,
        });
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [currentPage, limit]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedMovies = [...movies.movies].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      if (typeof aValue === "number" && typeof bValue === "number") {
        return aValue - bValue;
      }
      return aValue.toString().localeCompare(bValue.toString());
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return bValue - aValue;
    }
    return bValue.toString().localeCompare(aValue.toString());
  });

  const handleGotoPage = (page) => {
    setCurrentPage(page);
  };

  const rangeStart = (currentPage - 1) * limit + 1;
  const rangeEnd = Math.min(currentPage * limit, movies.totalItems);

  const handleDelete = async (movieId) => {
    try {
      await axios
        .delete(`https://victorious-lion-clothes.cyclic.cloud/api/movies/delete/${movieId}`, headers)
        .then((response) => {
          setMovies({
            totalItems: response.data.data.movie_count,
            movies: response.data.data.movies,
          });
          showToast("success", "Movie Deleted", 100, 1800);
        })
        .catch((erorr) => {
          console.log(erorr);
          showToast("error", "Unable to delete movie", 100, 1800);
        });
    } catch (error) {
      console.log(error);
      showToast("error", "Unable to delete movie", 100, 1800);
    }
  };
  return (
    <div className="container-fluid p-0">
      <div className="border-start border-dark bg-primary p-3 d-flex text-white justify-content-between align-items-center">
        <span className="fs-4 fw-bold">Movies</span>
        <button
          className="btn btn-outline-light"
          onClick={() => handleShowModal({})}
        >
          Add Movie
        </button>
        <MovieModal
          show={showModal}
          handleClose={handleCloseModal}
          movie={selectedMovie}
          handleSubmit={handleSaveMovie}
        />
      </div>

      <div className="mt-3 d-flex flex-column justify-content-center align-items-center ">
        {isLoading ? (
          <Spinner animation="border" className="color-green" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <MovieTable
              movies={sortedMovies}
              sortConfig={sortConfig}
              handleSort={handleSort}
              openModal={handleShowModal}
              deleteMovie={handleDelete}
            />
            <div className="container d-flex flex-column justify-content-center align-items-center">
              <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center mb-2">
                <p className="text-white mb-2 mb-md-0">
                  Showing {rangeStart} - {rangeEnd} of {movies.totalItems}{" "}
                  movies
                </p>
                <Form.Select
                  className="mb-2 mb-md-0"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  style={{ width: "180px" }}
                >
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={30}>30 per page</option>
                  <option value={40}>40 per page</option>
                  <option value={50}>50 per page</option>
                </Form.Select>
              </div>
              <MyPagination
                currentPage={currentPage}
                totalItems={movies.totalItems}
                gotoPage={handleGotoPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
