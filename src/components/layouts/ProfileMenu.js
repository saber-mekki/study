import React from "react";
import { Link } from "react-router-dom";
import {
  FaCog,
  FaBookOpen,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

import Cookies from "js-cookie";

function ProfileMenu() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Cookies.remove("role");
    window.location.href = "/";
  };

  const userRole = Cookies.get("role");
  const name = Cookies.get("name");

  return (
    <li className="nav-item dropdown" style={{ marginLeft: "205px" }}>
      <a
        className="nav-link dropdown-toggle"
        href="#!"
        id="profileDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src="/assets/images/profile.jpg"
          alt="Profile"
          className="d-none d-lg-block"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span className="d-block d-lg-none">Profile</span>
      </a>
      <div className="dropdown-menu" aria-labelledby="profileDropdown">
        <Link to="/profile" className="dropdown-item d-flex m-0  ">
          <img
            src="/assets/images/profile.jpg"
            alt="Profile"
            className="d-none d-lg-block mr-2 border border-primary "
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="mt-2 ">{name}</span>
        </Link>

        <div className="dropdown-divider"></div>

        {userRole === "student" && (
          <>
            <Link to="/courses" className="dropdown-item">
              <FaBookOpen style={{ marginRight: "10px" }} /> My Courses
            </Link>
            <Link to="/achievements" className="dropdown-item">
              <FaUserGraduate style={{ marginRight: "10px" }} /> Achievements
            </Link>
            <Link to="/calendar" className="dropdown-item">
              <SlCalender style={{ marginRight: "10px" }} /> Calendar
            </Link>
          </>
        )}

        {userRole === "tutor" && (
          <>
            <Link to="/my-classes" className="dropdown-item">
              <FaChalkboardTeacher style={{ marginRight: "10px" }} /> My Classes
            </Link>
            <Link to="/courses" className="dropdown-item">
              <FaBookOpen style={{ marginRight: "10px" }} /> Create Course
            </Link>
          </>
        )}

        <Link to="/settings" className="dropdown-item">
          <FaCog style={{ marginRight: "10px" }} /> Settings
        </Link>
        <button className="dropdown-item" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: "10px" }} /> Logout
        </button>
      </div>
    </li>
  );
}

export default ProfileMenu;
