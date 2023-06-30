import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingMoviesSkeleton from './LoadingMoviesSkeleton'

const MovieCard = ({ movie }) => {
  const [isImageLoading, setIsImageLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsImageLoading(false)
    }
    img.src = movie.medium_cover_image

    return () => {
      Image.onload = null
    }
  }, [movie])

  return (
    <div className='rounded-3' style={{ width: '14rem', height: '20rem' }}>
      {isImageLoading ? (
        <LoadingMoviesSkeleton />
      ) : <Link to={`/movie/${movie.id}`}>
        <img src={movie.medium_cover_image} alt={movie.title} className='rounded-3 overflow-hidden' style={{ objectFit: 'cover', width: '14rem', height: '20rem' }} />
      </Link>}
    </div>
  )
}

export default MovieCard