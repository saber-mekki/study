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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function ProfileMenu() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Cookies.remove("role");
    window.location.href = "/";
  };

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
          alt={t("Profile")}
          className="d-none d-lg-block"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span className="d-block d-lg-none">{t("Profile")}</span>
      </a>
      <div className="dropdown-menu" aria-labelledby="profileDropdown">
        <Link to="/profile" className="dropdown-item d-flex m-0">
          <img
            src="/assets/images/profile.jpg"
            alt={t("Profile")}
            className="d-none d-lg-block mr-2 border border-primary"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="mt-2">{user.name}</span>
        </Link>

        <div className="dropdown-divider"></div>

        {user.role === "student" && (
          <>
            <Link to="/courses" className="dropdown-item">
              <FaBookOpen style={{ marginRight: "10px" }} /> {t("My Courses")}
            </Link>
            <Link to="/achievements" className="dropdown-item">
              <FaUserGraduate style={{ marginRight: "10px" }} /> {t("Achievements")}
            </Link>
            <Link to="/calendar" className="dropdown-item">
              <SlCalender style={{ marginRight: "10px" }} /> {t("Calendar")}
            </Link>
          </>
        )}

        {user.role === "tutor" && (
          <>
            <Link to="/my-classes" className="dropdown-item">
              <FaChalkboardTeacher style={{ marginRight: "10px" }} /> {t("My Classes")}
            </Link>
            <Link to="/courses" className="dropdown-item">
              <FaBookOpen style={{ marginRight: "10px" }} /> {t("Create Course")}
            </Link>
          </>
        )}

        <Link to="/settings" className="dropdown-item">
          <FaCog style={{ marginRight: "10px" }} /> {t("Settings")}
        </Link>
        <button className="dropdown-item" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: "10px" }} /> {t("Logout")}
        </button>
      </div>
    </li>
  );
}

export default ProfileMenu;
  