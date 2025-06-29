import React from "react";
import { isAdmin } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  if (!isAdmin()) {
    return <h2>Unauthorized – Access Denied</h2>;
  }

  const handleSectionChange = (section) => {
    navigate(`/admin/${section}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <button
            className="btn btn-link text-primary"
            onClick={() => handleSectionChange("courses")}
          >
            Manage Courses
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link text-primary"
            onClick={() => handleSectionChange("users")}
          >
            Manage Users
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link text-primary"
            onClick={() => handleSectionChange("stats")}
          >
            View Platform Statistics
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link text-danger"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
