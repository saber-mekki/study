import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from '../components/layouts/UserCard';
import AdminCourseCard from './AdminCourseCard';
import { FiUsers, FiClock, FiUser, FiBook } from 'react-icons/fi';
import { IoMan } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import {jwtDecode} from "jwt-decode";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminDashboard = ({ section }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const [currentSection, setCurrentSection] = useState(() => {
    if (section) return section;
    const qSection = getQueryParam("section");
    return qSection || "dashboard";
  });

  const [users, setUsers] = useState(0);
  const [users0, setUsers0] = useState([]);
  const [tutorsList, setTutorsList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [tutors, setTutors] = useState(0);
  const [students, setStudents] = useState(0);
  const [waitingUsers, setWaitingUsers] = useState(0);
  const [waitingUsersList, setWaitingUsersList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [admin, setAdmin] = useState(0);
  const [blogsList, setBlogsList] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);

  const [formationsList, setFormationsList] = useState([]);
  const [formations, setFormations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  let userName = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || decoded.username || decoded.user_name || "";
    } catch (error) {
      console.error("Invalid token");
    }
  }

  useEffect(() => {
    if (section && section !== currentSection) {
      setCurrentSection(section);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("section", section);
      history.replace({ search: searchParams.toString() });
    } else {
      const qSection = getQueryParam("section");
      if (qSection && qSection !== currentSection) {
        setCurrentSection(qSection);
      }
    }
  }, [location.search, section]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;

        const resUsers = await axios.get(`${baseURL}/users`);
        const allUsers = resUsers.data.result || [];

        const onlyTutors = allUsers.filter(u => u.type_register === "tutor");
        const onlyStudents = allUsers.filter(u => u.type_register === "student");
        const waiting = allUsers.filter(u => u.status === "waiting" && u.type_register !== "admin");
        const admin = allUsers.filter(u => u.type_register === "admin");

        try {
          const resFormations = await axios.get(`${baseURL}/GetAllCourses`);
          const allFormations = resFormations.data.courses || [];
          setFormations(allFormations.length);
          setFormationsList(allFormations);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
          setFormations(0);
        }

        try {
          const resBlogs = await axios.get(`${baseURL}/blogs`);
          const allBlogs = resBlogs.data.result || [];
          setBlogsCount(allBlogs.length);
          setBlogsList(allBlogs);
        } catch (error) {
          console.error("Failed to fetch blogs:", error);
          setBlogsCount(0);
        }

        setUsers0(allUsers);
        setTutorsList(onlyTutors);
        setStudentsList(onlyStudents);
        setUsers(allUsers.length);
        setTutors(onlyTutors.length);
        setStudents(onlyStudents.length);
        setWaitingUsers(waiting.length);
        setWaitingUsersList(waiting);
        setAdminList(admin);
        setAdmin(admin.length);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{t("error")}: {error}</p>;

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("section", section);
    history.push({ search: searchParams.toString() });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <nav
        style={{
          maxWidth: "220px",
          minWidth: "200px",
          backgroundColor: "#222",
          color: "#fff",
          padding: "20px",
          boxSizing: "border-box",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
       <Link to="/home-one" className="text-decoration-none">
      <h2
        style={{
          marginBottom: "2rem",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "inherit",
        }}
      >
        {t("HOME")}
      </h2>
    </Link>
            <h2 style={{ marginBottom: "2rem", fontWeight: "bold", fontSize: "1.5rem" }}>
          {t("adminPanel")}
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flexGrow: 1,
          }}
        >
          {[
            { label: t("dashboard"), section: "dashboard" },
            { label: t("allUsers"), section: "All Users" },
            { label: t("allTutors"), section: "All Tutors" },
            { label: t("allStudents"), section: "All Students" },
            { label: t("waitingUsers"), section: "All Users waiting" },
            { label: t("formations"), section: "All Formations" },
            { label: t("admins"), section: "All Admins" },
            { label: t("blogs"), section: "All Blogs" },
          ].map(({ label, section }) => {
            const isActive = currentSection === section;
            return (
              <li key={section}>
                <button
                  onClick={() => handleSectionChange(section)}
                  style={{
                    width: "100%",
                    backgroundColor: isActive ? "#ff4d4d" : "transparent",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "1rem",
                    borderRadius: "4px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "#ff6666";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <main style={{ flexGrow: 1, padding: "30px" }}>
        {currentSection === "dashboard" && (
          <>
            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
              {t("welcomeAdmin", { userName })}
            </h1>
            <p style={{ color: "#555", marginBottom: "30px" }}>{t("overview")}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                margin: "55px",
              }}
            >
              {[
                { title: t("allUsers"), value: users, icon: <FiUsers size={30} color="#007bff" /> },
                { title: t("waitingUsers"), value: waitingUsers, icon: <FiClock size={30} color="#ffc107" /> },
                { title: t("allTutors"), value: tutors, icon: <IoMan size={30} color="#28a745" /> },
                { title: t("allStudents"), value: students, icon: <FiUser size={30} color="#dc3545" /> },
                { title: t("allAdmins"), value: admin, icon: <RiAdminLine size={30} color="#6f42c1" /> },
                { title: t("All Formations"), value: formations, icon: <FiBook size={30} color="#17a2b8" /> },
                { title: t("blogs"), value: blogsCount, icon: <FiBook size={30} color="#17a2b8" /> },
              ].map((stat) => (
                <div
                  onClick={() => handleSectionChange(stat.title)}
                  key={stat.title}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    padding: "25px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid #ddd",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 15px 3px rgba(255, 0, 0, 0.7)";
                    e.currentTarget.style.borderColor = "red";
                    e.currentTarget.style.backgroundColor = "#ccc5b9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderColor = "#ddd";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <div style={{ paddingBottom: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {stat.icon}
                  </div>

                  <h3 style={{ fontSize: "1.1rem", color: "#333", marginBottom: "10px" }}>
                    {stat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                      margin: 0,
                      color: "#007bff",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {currentSection === "All Users" && (
          <>
            <h2>{t("allUsers")} ({users})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {users0.map((user) => (
                <UserCard
                  key={user.user_id}
                  id={user.user_id}
                  name={user.user_name}
                  email={user.user_email}
                  role={user.type_register}
                  status={user.status}
                  image={user.photo}
                />
              ))}
            </div>
          </>
        )}

        {currentSection === "All Tutors" && (
          <>
            <h2>{t("allTutors")} ({tutors})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {tutorsList.map((user) => (
                <UserCard
                  key={user.user_id}
                  id={user.user_id}
                  name={user.user_name}
                  email={user.user_email}
                  role={user.type_register}
                  status={user.status}
                  image={user.photo}
                />
              ))}
            </div>
          </>
        )}

        {currentSection === "All Students" && (
          <>
            <h2>{t("allStudents")} ({students})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {studentsList.map((user) => (
                <UserCard
                  key={user.user_id}
                  id={user.user_id}
                  name={user.user_name}
                  email={user.user_email}
                  role={user.type_register}
                  status={user.status}
                  image={user.photo}
                />
              ))}
            </div>
          </>
        )}

        {currentSection === "All Users waiting" && (
          <>
            <h2>{t("waitingUsers")} ({waitingUsers})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {waitingUsersList.map((user) => (
                <UserCard
                  key={user.user_id}
                  id={user.user_id}
                  name={user.user_name}
                  email={user.user_email}
                  role={user.type_register}
                  status={user.status}
                  image={user.photo}
                />
              ))}
            </div>
          </>
        )}

        {currentSection === "All Admins" && (
          <>
            <h2>{t("admins")} ({admin})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {adminList.map((user) => (
                <UserCard
                  key={user.user_id}
                  id={user.user_id}
                  name={user.user_name}
                  email={user.user_email}
                  role={user.type_register}
                  status={user.status}
                  image={user.photo}
                />
              ))}
            </div>
          </>
        )}

        {currentSection === "All Formations" && (
          <>
            <h2>{t("formations")} ({formations})</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {formationsList.map((course) => (
                <AdminCourseCard key={course.id} {...course} />
              ))}
            </div>
          </>
        )}

        {currentSection === "All Blogs" && (
          <>
            <h2>{t("blogs")} ({blogsCount})</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {blogsList.map((blog) => (
                <AdminCourseCard key={blog.id} {...blog} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
