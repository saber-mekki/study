import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCog,
  FaBookOpen,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaUserGraduate,


} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

import { SlCalender } from "react-icons/sl";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ProfileMenu() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [role, setrole] = useState("");
  const [name, setname] = useState("");
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Cookies.remove("role");
    window.location.href = "/";
  };

  useEffect(() => {

    setrole(Cookies.get("role"));
    setname(Cookies.get("name"));
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (token) {

          let urlImage = ""
          const decodedToken = jwtDecode(token);
          const userEmail = decodedToken.user_email;

          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/getUser`,
            {
              email: userEmail,
            }
          );

          if (response.data.error) {
            setError("User not found");
          } else {
            setname(response.data.user.user_name);
            setrole(response.data.user.type_register);

            if (decodedToken.user_id) {
              await axios
                .get(`${process.env.REACT_APP_API_BASE_URL}/images/${decodedToken.user_id}`)
                .then((response) => {
                  urlImage = response.data[response.data.length - 1].image_url
                })
                .catch((error) => {
                  console.error("Error fetching images:", error);
                });
            }

            dispatch(
              setUser({
                name: response.data.user.user_name,
                role: response.data.user.type_register,
                phone: response.data.user.phone_number,
                dateOfBirth: response.data.user.date_of_birth,
                gender: response.data.user.gender,
                idUser: decodedToken.user_id,
                urlImage: urlImage
              })
            );

          }
        }
      } catch (err) {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching user data.");
        }
      }
    };

    fetchUserData();
  }, [dispatch, user]);

  return (
<li className="nav-item dropdown ml-md-custom">

      {error && <div className="text-danger">{error}</div>}
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
          src={user.urlImage || "/assets/images/tutorprofil.png"}
          alt={t("Profile")}
          className="d-none d-lg-block"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Link to="/profile">
        <span className="d-block d-lg-none">{t("Profile")}</span>
        </Link>
      </a>
      <div className="dropdown-menu" aria-labelledby="profileDropdown">
        <Link to="/profile" className="dropdown-item d-flex m-0">
          <img
            src={user.urlImage || "/assets/images/tutorprofil.png"}
            alt={t("sProfile")}
            className="d-none d-lg-block mx-2 border border-primary"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="mt-2">{name}</span>
        </Link>

        <div className="dropdown-divider"></div>
        <Link to="/profile/account" className="dropdown-item">
          <MdAccountCircle style={{ marginRight: "10px" }} /> {t("Account")}
        </Link>

        {role === "student" && (
          <>
            <Link to="/profile/courses" className="dropdown-item">
              <FaBookOpen style={{ marginRight: "10px" }} /> {t("My Courses")}
            </Link>
            <Link to="/profile/achievements" className="dropdown-item">
              <FaUserGraduate style={{ marginRight: "10px" }} />{" "}
              {t("Achievements")}
            </Link>

          </>
        )}
        <Link to="/profile/calendar" className="dropdown-item">
          <SlCalender style={{ marginRight: "10px" }} /> {t("Calendar")}
        </Link>

        {role === "tutor" && (
          <>
            <Link to="/profile/courses" className="dropdown-item">
              <FaChalkboardTeacher style={{ marginRight: "10px" }} />{" "}
              {t("My Classes")}
            </Link>
            <Link to="/profile/addcourse" className="dropdown-item">
              <FaBookOpen style={{ marginRight: "10px" }} />{" "}
              {t("Create Course")}
            </Link>
          </>
        )}

        <Link to="/profile/settings" className="dropdown-item">
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
