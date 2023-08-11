import React from "react";
import { formatDate } from "../../utils/date";
import { MdDelete, MdEdit } from "react-icons/md";

const MovieTable = ({
  movies,
  sortConfig,
  handleSort,
  openModal,
  deleteMovie,
}) => {
  const sortArrow = <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>;

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th onClick={() => handleSort("imdb_code")}>
              IMDB Code {sortConfig.key === "imdb_code" && sortArrow}
            </th>
            <th onClick={() => handleSort("title")}>
              Title {sortConfig.key === "title" && sortArrow}
            </th>
            <th onClick={() => handleSort("year")}>
              Year {sortConfig.key === "year" && sortArrow}
            </th>
            <th onClick={() => handleSort("rating")}>
              Rating {sortConfig.key === "rating" && sortArrow}
            </th>
            <th onClick={() => handleSort("runtime")}>
              Runtime {sortConfig.key === "runtime" && sortArrow}
            </th>
            <th>Language</th>
            <th onClick={() => handleSort("date_added")}>
              Date Added {sortConfig.key === "date_added" && sortArrow}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.imdb_code}</td>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.rating}</td>
              <td>{movie.runtime}</td>
              <td>{movie.language}</td>
              <td>{formatDate(movie.date_added)}</td>
              <td>
                <button
                  className="btn cursor-pointer text-white"
                  onClick={() => openModal(movie)}
                >
                  <MdEdit />
                </button>
                <button
                  className="btn cursor-pointer text-white"
                  onClick={() => deleteMovie(movie._id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
