import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
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
import Page404 from "../../Page404";
import { IoArrowBack } from "react-icons/io5";
import { AcceptedBookingsList } from "../profileComponents/AcceptedBookingsList";
import { CoursesLibrary } from "./myClasses/CoursesLibrary";
import { Quiz } from "./myClasses/Quiz";

const UserProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { section } = useParams();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isMobile, setIsMobile] = useState("");
  const [menuOpen, setMenuOpen] = useState(true);
  const currentSection = section || "accueil";

  const handleSectionChange = (newSection) => {
    history.push(`/profile/${newSection}`);

    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleReturn = () => {
    setMenuOpen(true);
    history.push("/profile");
  };
  const handleAccountUpdate = () => {
    handleSectionChange("accueil");
    window.location.reload();
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

        let urlImage = "";
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.user_email;
        setEmail(userEmail);

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/getUser`,
          { email: userEmail }
        );

        if (response.data.error) {
          setError("User not found");
        } else {
          setName(response.data.user.user_name);
          setRole(response.data.user.type_register);

          if (decodedToken.user_id) {
            await axios
              .get(
                `${process.env.REACT_APP_API_BASE_URL}/images/${decodedToken.user_id}`
              )
              .then((response) => {
                urlImage =
                  response.data[response.data.length - 1]?.image_url || "";
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
              urlImage: urlImage,
            })
          );
        }
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching user data.");
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  const validSections = [
    "accueil",
    "account",
    "settings",
    "addcourse",
    "courses",
    "password",
    "calendar",
    "bookings",
    "classes",
    "Quiz"
  ];

  if (!validSections.includes(currentSection)) {
    return <Page404 />;
  }

  return (
    <>
      <HeaderOne />

      <div>
        {error && <div className="text-danger">{error}</div>}
        <div className="row gutters">
          {!menuOpen && (
        <button
        onClick={handleReturn}
        className="btn btn-link d-block d-md-none text-primary"
      >
        <IoArrowBack size={26} />
      </button>
          )}

          {menuOpen && (
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="menu">
                    <ul className="list-group">
                      {currentSection !== "accueil" && !isMobile && (
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            onClick={() => handleSectionChange("accueil")}
                            src={
                              user.urlImage || "/assets/images/tutorprofil.png"
                            }
                            alt="Admin"
                            className="rounded-circle p-1 bg-primary"
                            width="60"
                            style={{ cursor: "pointer" }}
                          />
                          <div className="mt-3">
                            <h4
                              onClick={() => handleSectionChange("accueil")}
                              style={{ cursor: "pointer" }}
                            >
                              {name}
                            </h4>
                            <h6 className="text-muted small mb-1">{t(role)}</h6>
                          </div>
                        </div>
                      )}

                      {isMobile && (
                        <li className="list-group-item">
                          <button
                            className="btn btn-link text-primary pb-0 px-4"
                            onClick={() => handleSectionChange("accueil")}
                          >
                            {t("Accueil")}
                          </button>
                        </li>
                      )}

                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("account")}
                        >
                          {t("Account")}
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("settings")}
                        >
                          {t("Settings")}
                        </button>
                      </li>
                      {role === "tutor" && (
                        <li className="list-group-item">
                          <button
                            className="btn btn-link text-primary pb-0 px-4"
                            onClick={() => handleSectionChange("addcourse")}
                          >
                            {t("Add Courses")}
                          </button>
                        </li>
                      )}
                   {  role!=="admin" && ( <>
                  <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("courses")}
                        >
                          {t("My Courses")}
                        </button>
                      </li>
                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("classes")}
                        >
                          {t("My Classes")}
                        </button>
                      </li>   </>) } 
                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("Quiz")}
                        >
                          {t("Quiz")}
                        </button>
                      </li>
                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("password")}
                        >
                          {t("Change Password")}
                        </button>
                      </li>
                      {role === "tutor" && (     <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange("calendar")}
                        >
                          {t("Calendar")}
                        </button>
                      </li>)}
                      {role === "student" && (     <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
                          onClick={() => handleSectionChange(t("bookings"))}
                        >
                          {t("Bookings")}
                        </button>
                      </li>)}
                      <li className="list-group-item">
                        <button
                          className="btn btn-link text-primary pb-0 px-4"
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
          )}

          {(!menuOpen || !isMobile) && (
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  {currentSection === "accueil" && (
                    <Accueil image={user.urlImage} email={email} />
                  )}
                  {currentSection === "account" && (
                    <Account
                      onAccountUpdate={handleAccountUpdate}
                      email={email}
                    />
                  )}
                  {currentSection === "settings" && <Settings />}
                  {currentSection === "addcourse" && (
                    <AddCourse email={email} />
                  )}
                  {currentSection === "courses" && <Mycourses email={email} />}
                  {currentSection === "password" && <Password email={email} />}
                  {currentSection === "calendar" && <CalendarSelector />}
                  {currentSection === "bookings" && <AcceptedBookingsList />}
                  {currentSection === "classes" && <CoursesLibrary  />}
                  {currentSection === "Quiz" && <Quiz  />}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
