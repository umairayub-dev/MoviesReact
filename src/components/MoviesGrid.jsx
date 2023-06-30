import React from 'react'
import MovieCard from './MovieCard'
import { Row } from 'react-bootstrap'

const MoviesGrid = ({movies}) => {
    return (
        <Row className="row row-cols-1 row-cols-sm-3 row-cols-md-5 g-3 gap-3 justify-content-center">
            {movies.map((movie, key) => <MovieCard key={key} movie={movie} />)}
        </Row>
    )
}

export default MoviesGrid