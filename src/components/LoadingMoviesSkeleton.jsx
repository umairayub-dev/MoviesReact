import React from 'react'
import { Placeholder } from 'react-bootstrap'
const LoadingMoviesSkeleton = () => {
    return (
        <Placeholder animation='glow' className="rounded-3" style={{ width: '14rem', height: '20rem' }}>
            <Placeholder xs={6} className="rounded-3" style={{ width: '14rem', height: '20rem' }} />
        </Placeholder>
    )
}

export default LoadingMoviesSkeleton