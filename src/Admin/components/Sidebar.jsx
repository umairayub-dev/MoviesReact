import React, { useContext, useState } from "react";
import { FiHome } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { decodeToken } from "react-jwt";
import ProfileSettingsModal from "./ProfileSettingModal";
export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const location = useLocation();
  const { state } = useContext(AuthContext);

  const getUser = () => {
    const token = state?.token;
    const user = decodeToken(token);
    return { ...user, token };
  };
  const NavItems = [
    {
      tab: "Dashboard",
      url: "/admin-panel/dashboard",
      icon: <FiHome />,
    },
    {
      tab: "Movies",
      url: "/admin-panel/movies",
      icon: <BiCategoryAlt />,
    },
    {
      tab: "Users",
      url: "/admin-panel/users",
      icon: <FaUsers />,
    },
  ];
  return (
    <>
      <div className="bg-primary p-3 d-flex text-white justify-content-between align-items-center">
        <span>{getUser().username}</span>
        <CgProfile
          size={28}
          color="white"
          className="align-self-center ms-2 cursor-pointer"
          onClick={handleOpenModal}
        />
        <ProfileSettingsModal
          show={showModal}
          handleClose={handleCloseModal}
          user={getUser()}
        />
      </div>

      <ul className="nav flex-column pt-3">
        {NavItems.map((val, key) => (
          <li
            key={key}
            className={`nav-item m-2  ${
              location.pathname == val.url ? "bg-white rounded" : null
            }`}
          >
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to={val.url}
            >
              <span>{val.icon}</span>
              <span>{val.tab}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
