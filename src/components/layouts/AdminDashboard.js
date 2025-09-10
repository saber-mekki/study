import React from "react";
import { isAdmin } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const navigate = useNavigate();
const { t } = useTranslation();

  if (!isAdmin()) {
    return <h2> {t("Unauthorized – Access Denied")} </h2>;
  }

  const handleSectionChange = (section) => {
    navigate(`/admin/${section}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{t("Admin Dashboard")} </h2>
      <ul className="list-group">
        <li className="list-group-item">
          <button
            className="btn btn-link text-primary"
            onClick={() => handleSectionChange("courses")}
          >
            {t("Manage Courses")}
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link text-primary"
            onClick={() => handleSectionChange("users")}
          >
            {t("Manage Users")}
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link text-primary"
            onClick={() => handleSectionChange("stats")}
          >
             {t("View Platform Statistics")}
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
             {t("Logout")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
