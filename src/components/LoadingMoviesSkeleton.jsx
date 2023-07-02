import React from 'react'
import { Placeholder } from 'react-bootstrap'
const LoadingMoviesSkeleton = () => {
    return (
        <Placeholder animation='glow' className="rounded-3" style={{ width: '11rem', height: '17rem' }}>
            <Placeholder xs={6} className="rounded-3" style={{ width: '11rem', height: '17rem' }} />
        </Placeholder>
    )
}

export default LoadingMoviesSkeleton