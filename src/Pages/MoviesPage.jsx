import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Pagination from '../components/MyPagination'
import { Button, Container, Form, Spinner } from "react-bootstrap";
import MoviesGrid from '../components/MoviesGrid'

const MoviesPage = () => {
    const [response, setResponse] = useState([])
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query'))

    const getMovies = async () => {
        setError(false)
        setLoading(true)
        const query = searchParams.get('query')
        if (query !== undefined && query !== null && query !== "") {
            console.log(`https://yts.mx/api/v2/list_movies.json?page=${searchParams.get('page')}&query_term=${query}`)
            axios.get(`https://yts.mx/api/v2/list_movies.json?page=${searchParams.get('page')}&query_term=${query}`)
                .then((response) => {
                    setResponse(response.data.data)
                    console.log(response.data.data)
                    setMovies(response.data.data.movies)
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                    if (error.response && error.response.status === 404) {
                        setError("Movie not found.");
                    } else {
                        setError("Error fetching movie data. Please try again later.");
                    }
                    setLoading(false);
                });
        } else {
            axios.get(`https://yts.mx/api/v2/list_movies.json?page=${searchParams.get('page')}`)
                .then((response) => {
                    setResponse(response.data.data)
                    setMovies(response.data.data.movies)
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                    if (error.response && error.response.status === 404) {
                        setError("Movie not found.");
                    } else {
                        setError("Error fetching movie data. Please try again later.");
                    }
                    setLoading(false);
                });
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        searchTerm && setSearchParams({ page: 1, query: searchTerm })
    }
    const gotoPage = (p) => {
        if (!p < 1) {
            const query = searchParams.get('query')
            setSearchParams(query ? { page: p, query: query } : { page: p })
        }
    }

    useEffect(() => {
        getMovies()
    }, [searchParams])

    return (
        <div className="py-2 d-flex flex-column justify-content-center text-center align-items-center min-vh-100 ">
            {error ? (<h1 className='text-danger'>{error}</h1>) : (loading ? (<Spinner animation="border" className='color-green' role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>) : (
                <div >
                    <Container className='container p-4' bg="dark" data-bs-theme="dark">
                        <Form onSubmit={handleSearchSubmit}>
                            <Form.Group controlId="searchForm" className='input-group'>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your search query"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button variant="primary" type="submit" className='ms-0 bg-dark color-green border-0'>
                                    Search
                                </Button>
                            </Form.Group>

                        </Form>
                    </Container>
                    <div className='container min-d-flex flex-column text-center justify-content-center align-items-center'>
                        {movies ? (
                            <>
                                {searchParams.get("query") !== null ? (<h4 className="fw-bold color-green py-3">Search Results: ({response.movie_count})</h4>) : (<h4 className="color-green fs-2 py-2 fw-bold">Explore</h4>)}

                                <MoviesGrid movies={movies} />

                                <div className='mt-5 d-flex justify-content-center'>
                                    <Pagination totalItems={response.movie_count} currentPage={parseInt(searchParams.get('page')) || 1} gotoPage={gotoPage} />
                                </div>
                            </>
                        ) : (<h3 className='color-green'>Nothing found <br /> <Link to={"/movies"}>Go Back</Link></h3>)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MoviesPage