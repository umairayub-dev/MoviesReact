import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Pagination from '../components/MyPagination'
import { Badge, Button, Container, Form, Spinner } from "react-bootstrap";
import MoviesGrid from '../components/MoviesGrid'
import FilterModal from '../components/FilterModal';

const MoviesPage = () => {
    const [response, setResponse] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query'));
    const [filters, setFilters] = useState({
        quality: null,
        minimumRating: null,
        genre: null,
        sort_by: 'date_added',
        order_by: 'desc',
    });
    const [showModal, setShowModal] = useState(false);

    const getMovies = async () => {
        setLoading(true);
        try {
            const response = await axios.get(buildApiUrl());
            console.log(buildApiUrl());
            const { data } = response.data;
            setResponse(data);
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

    const buildApiUrl = () => {
        const query = searchParams.get('query');
        let apiUrl = `https://yts.mx/api/v2/list_movies.json?page=${searchParams.get(
            'page'
        ) || 1}`;

        if (query) {
            apiUrl += `&query_term=${query}`;
        }

        for (const key in filters) {
            if (filters[key]) {
                apiUrl += `&${key}=${filters[key]}`;
            }
        }

        return apiUrl;
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        searchTerm && setSearchParams({ page: 1, query: searchTerm })
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleFilterButtonClick = () => {
        setShowModal(true);
    };

    const applyFilters = () => {
        getMovies();
        handleModalClose();
    };

    const handleClearFilters = () => {
        setFilters({
            quality: null,
            minimumRating: null,
            genre: null,
            sortBy: null,
            orderBy: null
        });
        console.log("hello clear filter")
        handleModalClose()
        getMovies()

    };
    const gotoPage = (p) => {
        if (!p < 1) {
            const query = searchParams.get('query')
            setSearchParams(query ? { page: p, query: query } : { page: p })
        }
    }

    const countAppliedFilters = () => {
        let count = 0;
        for (const key in filters) {
            if (filters[key]) {
                count++;
            }
        }
        return count;
    };

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
                                    placeholder="Enter Movie Title/IMDb Code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button variant="secondary" className='ms-0 bg-dark color-green border-0 border-end' onClick={handleFilterButtonClick}>
                                    Filters
                                    {countAppliedFilters() > 0 && (
                                        <Badge pill bg="primary" className='ms-2'>
                                            {countAppliedFilters()}
                                        </Badge>
                                    )}
                                </Button>
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
            <FilterModal showModal={showModal} filters={filters} handleModalClose={handleModalClose} handleFilterChange={handleFilterChange} applyFilters={applyFilters} handleClearFilters={handleClearFilters} />
        </div>
    )
}

export default MoviesPage