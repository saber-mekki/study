import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Password from '../../helper/profile_Components/ChangePassword';
import Account from '../../helper/profile_Components/Account';
import Mycourses from '../../helper/profile_Components/Mycourses';
import Settings from '../../helper/profile_Components/Settings';
import Accueil from '../../helper/profile_Components/Accueil';
import HeaderOne from "./HeaderOne";
import Footer from "./FooterOne";
import axios from 'axios';
import { error } from 'jquery';


const UserProfile = () => {


    const [phone, setphone] = useState("")
    const [role, setrole] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [Error, setError] = useState("")
    const [activeSection, setActiveSection] = useState('accueil');
    const img = "/assets/images/profile.jpg"
    const handleSectionChange = (section) => {
        setActiveSection(section);
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
                setemail(userEmail);

                const response = await axios.post("http://localhost:5000/api/v1/getUser", {
                    email: userEmail,
                });

                if (response.data.error) {
                    setError("User not found");
                } else {
                    setname(response.data.user.user_name);
                    setrole(response.data.user.type_register);
                    setphone(response.data.user.phone_number);
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
    }, []);


    return (
        <>
            <HeaderOne />


            <div>
            {Error && (
                <div className="text-danger">{error}</div>
              )}
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="menu">
                                    <ul className="list-group">
                                        {(activeSection !== "accueil") && <div className="d-flex flex-column align-items-center text-center">
                                            <img
                                                onClick={() => handleSectionChange('accueil')}
                                                src={img}
                                                alt="Admin"
                                                className="rounded-circle p-1 bg-primary"
                                                width="60"
                                                style={{ cursor: "pointer" }}
                                            />
                                            <div className="mt-3">
                                                <h4
                                                    onClick={() => handleSectionChange('accueil')}
                                                    className="cursor-pointer"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {name}
                                                </h4>



                                                <h6 className="text-muted small mb-1">{role}</h6>
                                            </div>
                                        </div>
                                        }

                                        <li className="list-group-item">
                                            <button
                                                className="btn btn-link text-primary pb-0 px-4 "
                                                onClick={() => handleSectionChange('personal')}
                                            >
                                                Account
                                            </button>
                                        </li>
                                        <li className="list-group-item">
                                            <button
                                                className="btn btn-link text-primary pb-0 px-4 "
                                                onClick={() => handleSectionChange('settings')}
                                            >
                                                Settings
                                            </button>
                                        </li>
                                        <li className="list-group-item">
                                            <button
                                                className="btn btn-link text-primary pb-0 px-4 "
                                                onClick={() => handleSectionChange('courses')}
                                            >
                                                Courses
                                            </button>
                                        </li>
                                        <li className="list-group-item">
                                            <button
                                                className="btn btn-link text-primary pb-0 px-4 "
                                                onClick={() => handleSectionChange('password')}
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
                                {activeSection === 'accueil' && (
                                    <Accueil role={role} name={name} image={img} email={email} />
                                )}
                                {activeSection === 'personal' && (
                                    <Account phone={phone} name={name} role={role} email={email} />
                                )}


                                {activeSection === 'settings' && (
                                    <Settings />
                                )}

                                {activeSection === 'courses' && (
                                    <Mycourses />
                                )}


                                {activeSection === 'password' && (
                                    <Password email={email} />

                                )}
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
