import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ImStarHalf } from "react-icons/im"
import { Button, Card, Spinner } from "react-bootstrap"
import { FavoritesContext } from "../Context/Favorties/FavortiesContext"
import { AuthContext } from "../Context/Auth/AuthContext"
import useToast from "../Hooks/useToast"
import MoviesGrid from "../components/MoviesGrid"
import ScreenshotCarousel from "../components/ScreenshotCarousel"
import ReviewForm from '../components/ReviewForm'

const MovieDetailsPage = () => {
    const [movie, setMovie] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [genres, setGenres] = useState([])
    const [error, setError] = useState()
    const [loadingSuggestions, setLoadingSuggestions] = useState(true)
    const [suggestionError, setSuggestionError] = useState()
    const { id } = useParams()
    const showToast = useToast()
    const { state, dispatch } = useContext(FavoritesContext)
    const authContext = useContext(AuthContext)

    const getMovie = async () => {
        try {
            const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true`)
            setMovie(response.data.data.movie)
            setGenres(response.data.data.movie.genres)
            getSuggestions()
        } catch (e) {
            setError(e)
        }
    }
    const getSuggestions = async () => {
        setLoadingSuggestions(true)
        try {
            const response = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`)
            setSuggestions(response.data.data.movies)
            setLoadingSuggestions(false)
        } catch (e) {
            setLoadingSuggestions(false)
            setSuggestionError(e)
        }
    }
    useEffect(() => {
        getMovie()
    }, [id])


    const isFavorite = (id) => {
        return authContext.state.authStatus === "LoggedIn" ? state.favorites.filter((item) => item.id === parseInt(id)).length > 0 : false
    }
    const addToFavorites = () => {
        if (authContext.state.authStatus === "LoggedIn") {
            const item = { ...movie };
            dispatch({
                type: "ADD_TO_FAVORITES",
                payload: item
            })
            showToast("success", "Added to favorties", 100, 1500)
        } else {
            showToast("error", "Log in to add favorites", 50, 2000)
        }
    };
    const removeFromFavorites = (id) => {
        dispatch({
            type: "REMOVE_FROM_FAVORITES",
            payload: parseInt(id)
        })
        showToast("success", "Removed from favorties", 100, 1500)
    };

    const handleReviewSubmit = (review) => {
        console.log({ user: authContext.state.currentUser.email, movieId: movie.id, ...review });
    }
    return (
        <div className="min-vh-100 min-vw-100 h-100 bg-main text-white">
            <div className="container p-5">
                {error ? (<h1 className="text-center text-2xl text-red-400 font-bold p-3">{error.message}</h1>) : (<>
                    <div className="row justify-content-center">
                        <div className="row col-md-12 justify-content-evenly">
                            <div className="col-md-4">
                                <img src={movie.large_cover_image} alt={movie.slug} className="w-100" />
                            </div>
                            <div className="col-md-6">
                                <h2 className="display-5 fw-bold">{movie.title}</h2>
                                <div className="d-flex items-center flex-wrap mt-2">
                                    <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green">{movie.year}</span>
                                    <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green">{movie.runtime}Min</span>
                                    <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green"><ImStarHalf />{movie.rating}</span>
                                    {genres.map((genre, id) => <span className="badge mx-1 my-2 fs-6 rounded-pill bg-green" key={id}>{genre}</span>)}
                                </div>
                                <h3 className="fs-2 fw-bold mt-2">Synopsis</h3>
                                <p>{movie.description_intro}</p>
                                <Button variant="primary" size="md" className="bg-green" style={{ width: "100%" }} onClick={() => { !isFavorite(movie.id) ? addToFavorites() : removeFromFavorites(movie.id) }}>
                                    {!isFavorite(movie.id) ? "Add to Favorites" : "Remove from Favorites"}
                                </Button>
                            </div>
                        </div>
                        <hr className="mt-3" />
                        <div className="row mt-5">
                            <div className="col-md-6 my-2 d-flex justify-content-center">
                                <div>
                                    <h3 className="fs-2 color-green fw-bold">Screenshots</h3>
                                    <ScreenshotCarousel screenshots={[movie.large_screenshot_image1, movie.large_screenshot_image2, movie.large_screenshot_image3]} />
                                </div>
                            </div>
                            <div className="col-md-6 my-2">
                                <div style={{ height: 300 }}>
                                    <h3 className="fs-2 color-green fw-bold">Watch Trailer</h3>
                                    <iframe className="w-100 h-100" src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`} title="YouTube video player"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                                        allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <Card className="shadow-lg p-4" bg="dark" data-bs-theme="dark">
                                <h3 className="fs-3 color-green fw-bold">Leave a Review</h3>
                                <ReviewForm onSubmit={handleReviewSubmit} />
                            </Card>
                        </div>

                        <div className="col col-md-12  mt-5 d-flex justify-content-center">
                            {loadingSuggestions ? <Spinner animation="border" className="color-green" role="status" style={{ width: "3rem", height: "3rem" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                                <div className="w-100">
                                    <h3 className="color-green fs-2 fw-bold">Related Movies</h3>
                                    {suggestionError ? <h3>Error loading suggestions</h3> : <div>
                                        {suggestions && <MoviesGrid movies={suggestions} />}
                                    </div>}
                                </div>
                            }
                        </div>
                    </div>
                </>)
                }
            </div>
        </div >
    )
}

export default MovieDetailsPage