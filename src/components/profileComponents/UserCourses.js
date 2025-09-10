import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const UserCourses = ({ userId }) => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/user/${userId}`
        );
        setCourses(data.courses || []);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <p className="text-center mt-5">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">
        📚 {courses[0] ? `${courses[0].tutor}'s Courses` : "Courses"}
      </h2>

      {courses.length === 0 ? (
        <p className="text-center">{t("No courses found")}.</p>
      ) : (
        <>
          <div className="row">
            {paginatedCourses.map((course) => (
              <div key={course.course_id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-lg border-0 h-100">
                  <div className="card-body">
                    <p className="mb-1">
                      <strong>{course.title}</strong>
                    </p>
                    <p>{course.description}</p>
                    <p className="mb-1">
                      <strong>Start:</strong>{" "}
                      {new Date(course.start_date).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>{t("End")}:</strong>{" "}
                      {new Date(course.end_date).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>{t("Price")}:</strong> ${course.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination MUI */}
          <Stack spacing={2} alignItems="center" className="mt-4">
            <Pagination
              count={Math.ceil(courses.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default UserCourses;
