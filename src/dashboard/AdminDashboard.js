import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UserCard from '../components/layouts/UserCard';
import AdminCourseCard from './AdminCourseCard';
import Announcements from './Announcements';
import { FiUsers, FiClock, FiUser, FiBook, FiMenu } from 'react-icons/fi';
import { IoMan } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import "./AdminDashboard.css";

const AdminDashboard = ({ section }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginate = (list) => {
    const start = (currentPage - 1) * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  };


  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || decoded.username || decoded.user_name || "";
    } catch (error) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    Cookies.remove("role");
    history.push("/login");
  };

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
        } catch {
          setFormations(0);
        }

        try {
          const resBlogs = await axios.get(`${baseURL}/blogs`);
          const allBlogs = resBlogs.data.result || [];
          setBlogsCount(allBlogs.length);
          setBlogsList(allBlogs);
        } catch {
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
    setSidebarOpen(false); 
  };

  return (
    <div className="dashboard-container">

      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FiMenu size={24} />
      </button>


      <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Link to="/home-one" className="sidebar-home">{t("HOME")}</Link>
        <h2 className="sidebar-title">{t("adminPanel")}</h2>

        <ul className="sidebar-menu">
          {[
            { label: t("dashboard"), section: "dashboard" },
            { label: t("allUsers"), section: "All Users" },
            { label: t("allTutors"), section: "All Tutors" },
            { label: t("allStudents"), section: "All Students" },
            { label: t("waitingUsers"), section: "All Users waiting" },
            { label: t("formations"), section: "All Formations" },
            { label: t("admins"), section: "All Admins" },
            { label: t("blogs"), section: "All Blogs" },
            { label: t("announcements"), section: "Announcements" }
          ].map(({ label, section }) => (
            <li key={section}>
              <button
                className={`sidebar-btn ${currentSection === section ? "active" : ""}`}
                onClick={() => handleSectionChange(section)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          {t("logout")}
        </button>
      </nav>

      <main className="dashboard-main">
        {currentSection === "dashboard" && (
          <>
            <h1 className="mt-5">{t("welcomeAdmin", { userName })}</h1>
            <p className="overview">{t("overview")}</p>

            <div className="stats-grid">
              {[
                { title: t("allUsers"), value: users, icon: <FiUsers size={30} /> },
                { title: t("waitingUsers"), value: waitingUsers, icon: <FiClock size={30} /> },
                { title: t("allTutors"), value: tutors, icon: <IoMan size={30} /> },
                { title: t("allStudents"), value: students, icon: <FiUser size={30} /> },
                { title: t("allAdmins"), value: admin, icon: <RiAdminLine size={30} /> },
                { title: t("All Formations"), value: formations, icon: <FiBook size={30} /> },
                { title: t("blogs"), value: blogsCount, icon: <FiBook size={30} /> },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="stat-card"
                  onClick={() => handleSectionChange(stat.title)}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {currentSection === "Announcements" && <Announcements />}
        {currentSection === "All Users" && (
          <>
            <h2 className="mt-5">{t("allUsers")} ({users})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {paginate(users0).map((user) => (
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(users0.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}

        {currentSection === "All Tutors" && (
          <>
            <h2 className="mt-5">{t("allTutors")} ({tutors})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>

              {paginate(tutorsList).map((user) => (
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(tutorsList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}

        {currentSection === "All Students" && (
          <>
            <h2 className="mt-5">{t("allStudents")} ({students})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>

              {paginate(studentsList).map((user) => (
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(studentsList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}

        {currentSection === "All Users waiting" && (
          <>
            <h2 className="mt-5">{t("waitingUsers")} ({waitingUsers})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>

              {paginate(waitingUsersList).map((user) => (
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(waitingUsersList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}

        {currentSection === "All Admins" && (
          <>
            <h2 className="mt-5">{t("admins")} ({admin})</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>

              {paginate(adminList).map((user) => (
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(adminList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}

        {currentSection === "All Formations" && (
          <>
            <h2 className="mt-5">{t("formations")} ({formations})</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

              {paginate(formationsList).map((course) => (
                <AdminCourseCard key={course.id} {...course} />
              ))}
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(formationsList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}
        {currentSection === "All Blogs" && (
          <>
            <h2 className="mt-5">{t("blogs")} ({blogsCount})</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

              {paginate(blogsList).map((blog) => (
                <AdminCourseCard key={blog.id} {...blog} />
              ))}
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 3 }}
              >
                <Pagination
                  count={Math.ceil(blogsList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
