import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../Context/Auth/AuthContext";
import { MdLogout } from "react-icons/md";
import useToast from "../Hooks/useToast";
import { decodeToken } from "react-jwt";

const AdminNavLinks = () => (
  <>
    <NavLink className="nav-link mx-1" to="/" exact>
      Home
    </NavLink>
    <NavLink className="nav-link mx-1" to="/movies">
      Movies
    </NavLink>
  </>
);

const UserNavLinks = () => (
  <>
    <NavLink className="nav-link mx-1" to="/">
      Home
    </NavLink>
    <NavLink className="nav-link mx-1" to="/movies">
      Movies
    </NavLink>
    <NavLink className="nav-link mx-1" to="/favorites">
      Favorites
    </NavLink>
  </>
);

const GuestNavLinks = () => (
  <>
    <NavLink className="nav-link mx-1" to="/">
      Home
    </NavLink>
    <NavLink className="nav-link mx-1" to="/movies">
      Movies
    </NavLink>
  </>
);
const MyNavbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const showToast = useToast();
  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    showToast("success", "User logged out", 100, 1500);
  };

  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      return { username: res?.username, token: res?.role };
    }
  };
  const currentUser = decodeUser(state.token);
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="sm"
      className="w-100 min-vw-100"
    >
      <Container>
        <Navbar.Brand>
          <NavLink
            to="/"
            className="text-decoration-none color-green fw-bolder ms-2"
          >
            MFlix
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-1" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-between flex-grow-1 text-gray-200 align-baseline">
            <div className="d-flex flex-column flex-sm-row">
              {currentUser && currentUser.token === "admin" ? (
                <AdminNavLinks />
              ) : currentUser && currentUser.token ? (
                <UserNavLinks />
              ) : (
                <GuestNavLinks />
              )}
            </div>
            <div className="d-flex flex-row">
              {currentUser && currentUser.token === "admin" ? (
                <>
                  {/* Show admin-specific link(s) */}
                  <NavLink className="nav-link mx-1" to="/admin-panel">
                    Admin Panel
                  </NavLink>
                  <MdLogout
                    size={28}
                    color="red"
                    className="align-self-center ms-2 cursor-pointer"
                    onClick={() => logoutUser()}
                  />
                </>
              ) : currentUser && currentUser?.token ? ( // User is logged in
                <>
                  {/* Show username and logout */}
                  <span className="color-green align-self-center">
                    {console.log(currentUser)}
                    {currentUser.username}
                  </span>
                  <MdLogout
                    size={28}
                    color="red"
                    className="align-self-center ms-2 cursor-pointer"
                    onClick={() => logoutUser()}
                  />
                </>
              ) : (
                // Guest
                <>
                  {/* Show login and signup */}
                  <NavLink to="/login" className="btn color-green">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="btn color-green">
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
