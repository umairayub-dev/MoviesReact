import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { storage } from "../utils/FirebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";

const MovieModal = ({ show, handleClose, movie, handleSubmit }) => {
  const [formData, setFormData] = useState({});

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];
  useEffect(() => {
    setFormData(movie);
  }, [movie]);

  const storageRef = ref(storage, `images/movies/${formData.imdb_code}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (movie?._id) {
      handleSubmit(formData, true);
    }else {
      handleSubmit(formData, false);
    }
    handleClose();
  };

  const handleImageUpload = async (e, imageField) => {
    const imageFile = e.target.files[0];

    try {
      if (!imageFile) return;
      const snapshot = await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(snapshot.ref);
      setFormData((prevData) => ({ ...prevData, [imageField]: url }));
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleGenreChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedGenres = [...(formData.genres || [])];
      if (checked) {
        updatedGenres.push(value);
      } else {
        updatedGenres = updatedGenres.filter((genre) => genre !== value);
      }
      setFormData((prevData) => ({ ...prevData, [name]: updatedGenres }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      bg="dark"
      data-bs-theme="dark"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {movie.imdb_code ? "Update Movie" : "Add Movie"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="imdb_code">
            <Form.Label>IMDb Code</Form.Label>
            <Form.Control
              type="text"
              name="imdb_code"
              value={formData?.imdb_code}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              name="slug"
              value={formData?.slug}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData?.year}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData?.rating}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="runtime">
            <Form.Label>Runtime</Form.Label>
            <Form.Control
              type="number"
              name="runtime"
              value={formData?.runtime}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={formData?.language}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>YT Trailer Code</Form.Label>
            <Form.Control
              type="text"
              name="yt_trailer_code"
              value={formData?.yt_trailer_code}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="genres">
            <Form.Label>Genres</Form.Label>
            <div className="d-flex flex-wrap">
              {genres.map((genre) => (
                <Form.Check
                  key={genre}
                  type="checkbox"
                  label={genre}
                  name="genres"
                  value={genre}
                  checked={formData.genres && formData.genres.includes(genre)}
                  onChange={handleGenreChange}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group controlId="synopsis">
            <Form.Label>Synopsis</Form.Label>
            <Form.Control
              as="textarea"
              name="synopsis"
              value={formData?.synopsis}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="small_cover_image">
            <Form.Label>Small Cover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "small_cover_image")}
            />
            {formData.small_cover_image && (
              <img
                src={formData.small_cover_image}
                alt="Small Cover"
                style={{ marginTop: "10px", maxWidth: "100px" }}
              />
            )}
          </Form.Group>
          <Form.Group controlId="medium_cover_image">
            <Form.Label>Medium Cover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "medium_cover_image")}
            />
            {formData.medium_cover_image && (
              <img
                src={formData.medium_cover_image}
                alt="Medium Cover"
                style={{ marginTop: "10px", maxWidth: "150px" }}
              />
            )}
          </Form.Group>
          <Form.Group controlId="large_cover_image">
            <Form.Label>Large Cover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "large_cover_image")}
            />
            {formData.large_cover_image && (
              <img
                src={formData.large_cover_image}
                alt="Large Cover"
                style={{ marginTop: "10px", maxWidth: "200px" }}
              />
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            {movie.imdb_code ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MovieModal;
