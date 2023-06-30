import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../Context/Auth/AuthContext';
import { MdLogout } from 'react-icons/md'
import useToast from '../Hooks/useToast';

const MyNavbar = () => {
    const { state, dispatch } = useContext(AuthContext)
    const showToast = useToast()
    const logoutUser = () => {
        dispatch({ type: "LOGOUT_USER" })
        showToast("success", "User logged out", 100, 1500)

    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="sm" className='w-100 min-vw-100'>
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="text-decoration-none color-green fw-bolder">MFlix</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-3' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-between flex-grow-1 text-gray-200 align-baseline">
                        <div className='d-flex flex-column flex-sm-row'>
                            <NavLink className={`${({ isActive }) => isActive ? "active" : ""} nav-link mx-1`} to="/">Home</NavLink>
                            <NavLink className={`${({ isActive }) => isActive ? "active" : ""} nav-link mx-1`} to="/movies">Movies</NavLink>
                            <NavLink className={`${({ isActive }) => isActive ? "active" : ""} nav-link mx-1`} to="/favorites">Favorites</NavLink>
                        </div>
                        <div className='d-flex flex-row'>
                            {
                                state?.currentUser ? (
                                    <>
                                        <span className='color-green align-self-center'>{state.currentUser.email}</span>
                                        <MdLogout size={28} color='red' className='align-self-center ms-2 cursor-pointer' onClick={() => logoutUser()}>Logout</MdLogout>

                                    </>
                                ) : <>
                                    <NavLink to="/login" className="btn color-green">Login</NavLink>
                                    <NavLink to="/signup" className="btn color-green">Signup</NavLink>
                                </>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar
