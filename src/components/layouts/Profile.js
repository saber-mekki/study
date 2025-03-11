import React, { useState } from 'react';
import Cookies from "js-cookie";

import Password from '../../helper/profile_Components/ChangePassword';
import Account from '../../helper/profile_Components/Account';
import Mycourses from '../../helper/profile_Components/Mycourses';
import Settings from '../../helper/profile_Components/Settings';

const UserProfile = () => {
    const [activeSection, setActiveSection] = useState('personal');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        Cookies.remove("role");
        window.location.href = "/";
    };

    const name = Cookies.get("name");
    const role = Cookies.get("role");

    return (
        <div>
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="menu">
                                <ul className="list-group">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src="/assets/images/profile.jpg"
                                            alt="Admin"
                                            className="rounded-circle p-1 bg-primary"
                                            width="80"
                                        />
                                        <div className="mt-3">
                                            <h4>{name}</h4>
                                            <h6 className="text-secondary mb-1">{role}</h6>
                                        </div>
                                    </div>

                                    <li className="list-group-item">
                                        <button
                                            className="btn btn-link text-primary"
                                            onClick={() => handleSectionChange('personal')}
                                        >
                                            Account
                                        </button>
                                    </li>
                                    <li className="list-group-item">
                                        <button
                                            className="btn btn-link text-primary"
                                            onClick={() => handleSectionChange('settings')}
                                        >
                                            Settings
                                        </button>
                                    </li>
                                    <li className="list-group-item">
                                        <button
                                            className="btn btn-link text-primary"
                                            onClick={() => handleSectionChange('courses')}
                                        >
                                            Courses
                                        </button>
                                    </li>
                                    <li className="list-group-item">
                                        <button
                                            className="btn btn-link text-primary"
                                            onClick={() => handleSectionChange('password')}
                                        >
                                            Change Password
                                        </button>
                                    </li>
                                    <li className="list-group-item">
                                        <button
                                            className="btn btn-link text-primary"
                                            onClick={ handleLogout}
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
                            {activeSection === 'personal' && (
                                <Account />
                            )}

                            {activeSection === 'settings' && (
                                <Settings />
                            )}

                            {activeSection === 'courses' && (
                                <Mycourses />
                            )}


                            {activeSection === 'password' && (
                                <Password />

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
