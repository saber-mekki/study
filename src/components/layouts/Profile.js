import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

import Password from "../profileComponents/ChangePassword";
import Account from "../profileComponents/Account";
import AddCourse from "../profileComponents/AddCourse";
import Settings from "../profileComponents/Settings";
import Accueil from "../profileComponents/Accueil";
import HeaderOne from "./HeaderOne";
import Footer from "./FooterOne";
import Mycourses from "../profileComponents/Mycourses";
import CalendarSelector from "../profileComponents/CalendarSelector";

import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState("accueil");
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [role, setrole] = useState("");

  const handleSectionChange = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  useEffect(() => {
    const savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  const handleAccountUpdate = () => {
    window.location.reload();
    setActiveSection("accueil");
    localStorage.setItem("activeSection", "accueil");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    Cookies.remove("role");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          alert("No token found in localStorage");
          return;
        }
        let urlImage = ""
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.user_email;
        setEmail(userEmail);

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
                console.log({ ff: response.data })
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
    <>
      <HeaderOne />

      <div>
        {error && <div className="text-danger">{error}</div>}
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="menu">
                  <ul className="list-group">
                    {activeSection !== "accueil" && (
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          onClick={() => handleSectionChange("accueil")}
                          src={user.urlImage}
                          alt="Admin"
                          className="rounded-circle p-1 bg-primary"
                          width="60"
                          style={{ cursor: "pointer" }}
                        />
                        <div className="mt-3">
                          <h4
                            onClick={() => handleSectionChange("accueil")}
                            className="cursor-pointer"
                            style={{ cursor: "pointer" }}
                          >
                            {name}
                          </h4>

                          <h6 className="text-muted small mb-1">{t(role)}</h6>
                        </div>
                      </div>
                    )}

                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("personal")}
                      >
                        {t("Account")}
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("settings")}
                      >
                        {t("Settings")}
                      </button>
                    </li>
                    {role === "tutor" && (
                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4 "
                          onClick={() => handleSectionChange("addcourse")}
                        >
                          {t("Add Courses")}
                        </button>
                      </li>
                    )}

                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("courses")}
                      >
                        {t("My Courses")}
                      </button>
                    </li>
                    
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("password")}
                      >
                        {t("Change Password")}
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("calendar")}
                      >
                        {t("Calendar")}
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={handleLogout}
                      >
                        {t("Logout")}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                {activeSection === "accueil" && (
                  <Accueil
                    image={user.imagesUrl}
                    email={email}
                  />
                )}
                {activeSection === "personal" && (
                  <Account
                    onAccountUpdate={handleAccountUpdate}
                    email={email}
                  />
                )}

                {activeSection === "settings" && <Settings />}
                {activeSection === "addcourse" && <AddCourse email={email} />}
                {activeSection === "courses" && <Mycourses email={email} />}
                {activeSection === "password" && <Password email={email} />}
                {activeSection === "calendar" && <CalendarSelector  />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
