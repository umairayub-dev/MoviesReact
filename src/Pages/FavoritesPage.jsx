import React, { useContext, useEffect } from 'react'
import { FavoritesContext } from '../Context/Favorties/FavortiesContext'
import MovieCard from '../components/MovieCard'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/Auth/AuthContext'
import { Alert } from 'react-bootstrap'
import MoviesGrid from '../components/MoviesGrid'

const FavoritesPage = () => {
    const { state, dispatch } = useContext(AuthContext)
    const favoritesContext = useContext(FavoritesContext)
    const navigate = useNavigate()

    return (
        <div className="container min-vh-100">
            <div className='d-flex justify-content-between w-100 px-5 p-3'>
                <h3 className='fw-bold color-green'>Favorites</h3>
                <h3 className='fw-bold color-green'>({state.authStatus === "LoggedIn" ? favoritesContext.state.favorites.length : 0})</h3>
            </div>
            <div className='py-2 d-flex flex-column text-center'>
                {state.authStatus === "LoggedIn" ? <div>
                    <div className='container'>

                        {favoritesContext.state.favorites.length > 0 &&
                            <MoviesGrid movies={favoritesContext.state.favorites} />}
                    </div>
                </div> : <Alert variant='info' bg="dark" data-bs-theme="dark">
                    Please log in to access you favorite movies
                    <br />
                    <Link to={'/login'}>Login</Link>
                </Alert>}
            </div>
        </div>
    )
}

export default FavoritesPage
