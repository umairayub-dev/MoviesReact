import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import MoviesGrid from '../components/MoviesGrid'

export const HomePage = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()


    const getMovies = async () => {
        setLoading(true);
        const apiUrl = 'https://victorious-lion-clothes.cyclic.cloud/api/movies?minimum_rating=9&sort_by=rating'
      
        try {
          const response = await axios.get(apiUrl);
          const { data } = response.data;
          setMovies(data.movies);
        } catch (error) {
          console.error("Error fetching movie data:", error);
          if (error.response && error.response.status === 404) {
            setError("Movie not found.");
          } else {
            setError("Error fetching movie data. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
      };

    
    useEffect(() => {
        getMovies()
    }, [])

    return (
        <main>
            <section className="d-flex justify-content-center align-items-center text-white" style={{ backgroundImage: 'url(https://github.com/umairayub-dev/BoostrapAssignment/blob/main/images/bg-hero.png?raw=true)', height: '100vh' }}>                <div className="container text-center">
                <h1 className="fw-bolder lh-base display-4">Watch Free Movies With Mflix.</h1>
                <h3>Stop searching for free movie websites and watch Mflix now.</h3>
                <Link to="/movies" className="btn btn-lg cta fw-bold bg-purple-700 mt-3">Browse
                    Movies</Link>
            </div>
            </section>
            <section>
                <div className="container-fluid align-items-center p-5">
                    <div className="d-flex flex-column py-5">
                        <div className="d-flex flex-row border-bottom justify-content-between text-center align-items-center text-white">
                            <h1 className="display-6 fw-bold color-green">Popular Movies</h1>
                            <Link
                                to="/movies"
                                className="text-decoration-underline text-purple-300 cta fw-bold  mt-3">
                                Browse
                            </Link>
                        </div>
                        <div className="d-flex flex-row  justify-content-center p-4">
                            {error ? (<h1 className='text-danger'>{error}</h1>) : (loading ? (<Spinner animation="border" className='color-green' role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>) : (
                                <div className='container min-d-flex flex-column text-center justify-content-center align-items-center'>
                                    {movies ? (<MoviesGrid movies={movies} />) : (<h3 className='color-green'>Nothing found <br /> <Link to={"/movies"}>Go Back</Link></h3>)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
