import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";  

import Password from "../profileComponents/ChangePassword";
import Account from "../profileComponents/Account";
import AddCourse from "../profileComponents/AddCourse";
import Settings from "../profileComponents/Settings";
import Accueil from "../profileComponents/Accueil";
import HeaderOne from "./HeaderOne";
import Footer from "./FooterOne";

const UserProfile = () => {
  const dispatch = useDispatch();
  const img = "/assets/images/profile.jpg";

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

        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.user_email;
        setEmail(userEmail);

        const response = await axios.post(
          "http://localhost:5000/api/v1/getUser",
          {
            email: userEmail,
          }
        );

        if (response.data.error) {
          setError("User not found");
        } else {
          setname(response.data.user.user_name);
          setrole(response.data.user.type_register);
          dispatch(
            setUser({
              name: response.data.user.user_name,
              role: response.data.user.type_register,
              phone: response.data.user.phone_number,
              dateOfBirth: response.data.user.date_of_birth,
              gender: response.data.user.gender,
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
  }, [dispatch]);

  return (
    <>
      <HeaderOne />

      <div>
        {Error && <div className="text-danger">{error}</div>}
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
                          src={img}
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

                          <h6 className="text-muted small mb-1">{role}</h6>
                        </div>
                      </div>
                    )}

                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("personal")}
                      >
                        Account
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("settings")}
                      >
                        Settings
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("courses")}
                      >
                        ADD Courses
                      </button>
                      
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={() => handleSectionChange("password")}
                      >
                        Change Password
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="btn btn-link text-primary pb-0 px-4 "
                        onClick={handleLogout}
                      >
                        Logout
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
                   
                    image={img}
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

                {activeSection === "courses" && <AddCourse />}

                {activeSection === "password" && <Password email={email} />}
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
