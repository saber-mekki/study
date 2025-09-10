import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SectionTwo from "./layouts/SectionTwo";
import { useCart } from "./context/CartContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CourseDetailsOne = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.imageUrl
    });
    
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/${id}`
        );
        const data = res.data;

        const syllabusArray = Array.isArray(data.syllabus)
          ? data.syllabus
          : data.syllabus
            ? data.syllabus.split(/[,.\n]/).map((s) => s.trim()).filter(Boolean)
            : [];

        const requirementsArray = Array.isArray(data.requirements)
          ? data.requirements
          : data.requirements
            ? data.requirements.split(/[,.\n]/).map((r) => r.trim()).filter(Boolean)
            : [];

        setCourse({ ...data, syllabus: syllabusArray, requirements: requirementsArray });

      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/${id}/related`
        );
        setRelatedCourses(res.data.relatedCourses.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Error fetching related courses:", err);
      }
    };

    if (course?.category) {
      fetchRelated();
    }
  }, [id, course?.category]);
  if (!course) {
    return (
      <SectionTwo title={"Loading..."}>
        <div className="container">
          <p>{t("Loading course details")}...</p>
        </div>
      </SectionTwo>
    );
  }

  return (
    <SectionTwo title={"Course Details"}>
      <section className="section-padding">
        <div className="container">
          <div className="row">

            <div className="col-lg-8">
              <h2 className="text-secondary font-weight-bold mb-4">
                {course.title}
              </h2>
              <div className="mb-4">
                <img
                  className="img-fluid rounded"
                  src={course.image || process.env.PUBLIC_URL + "/assets/images/video-thumb-2.jpg"}
                  alt={course.title}
                />
              </div>

           
              <ul className="nav nav-pills mb-4 bg-gray tab-nav nav-justified">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="pill" href="#overview">
                    {t("Overview")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#syllabus">
                     {t("Syllabus")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#requirements">
                     {t("Requirements")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#reviews">
                     {t("Reviews")}
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade show active" id="overview">
                  <p>{course.description}</p>
                  <p><strong> {t("Category")}:</strong> {course.category}</p>
                  <p>
                    <strong> {t("Level")}:</strong> {course.level} |{" "}
                    <strong> {t("Duration")}:</strong> {course.duration} hours |{" "}
                    <strong> {t("Language")}:</strong> {course.language}
                  </p>
                  <p><strong> {t("Tutor")}:</strong> {course.tutor}</p>
                  <p>
                    <strong> {t("Date")}:</strong> {new Date(course.date).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="tab-pane fade" id="syllabus">
                  {course.syllabus.length > 0 ? (
                    <ul>
                      {course.syllabus.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p> {t("No syllabus provided")}.</p>
                  )}
                </div>

                <div className="tab-pane fade" id="requirements">
                  {course.requirements.length > 0 ? (
                    <ul>
                      {course.requirements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p> {t("No requirements provided")}.</p>
                  )}
                </div>

                <div className="tab-pane fade" id="reviews">
                  {course.ratings?.length > 0 ? (
                    course.ratings.map((review, idx) => (
                      <div key={idx} className="mb-3">
                        <strong>{review.user_name}</strong> ({review.rating}★)
                        <p>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>{t("No reviews yet")}.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="widget p-3 shadow-sm">
                <h2 className="text-blue font-weight-600">${course.price}</h2>
                <div className="rating text-primary mb-3">
                  <span className="font-weight-600">
                    {course.ratings?.length
                      ? (course.ratings.reduce((a, b) => a + b.rating, 0) / course.ratings.length).toFixed(1)
                      : "0.0"}
                  </span>
                  <i className="fas fa-star ml-1" />
                </div>

                <Link
                  to="#"
                  className="btn btn-sm btn-secondary ml-2"
                  onClick={handleAddToCart}
                >
                   {t("Add to Cart")}
                </Link>
              </div>

              <div className="widget shadow mt-4">
                <h4 className="widget-title"> {t("Course Curriculum")}</h4>
                <ul className="list-unstyled">
                  {course.syllabus.length > 0 ? (
                    course.syllabus.map((s, idx) => (
                      <li key={idx}>
                        <i className="fas fa-caret-right mr-2" /> {s}
                      </li>
                    ))
                  ) : (
                    <p> {t("No curriculum provided")}.</p>
                  )}
                </ul>
              </div>

              {relatedCourses.length > 0 && (
                <div className="widget shadow mt-4">
                  <h4 className="widget-title"> {t("Related Courses")}</h4>
                  {relatedCourses.map((c) => (
                    <div key={c.id} className="card mb-3 shadow-sm">
                      <img
                        className="card-img-top"
                        src={c.image || process.env.PUBLIC_URL + "/assets/images/video-thumb-2.jpg"}
                        alt={c.title}
                      />
                      <div className="card-body p-3">
                        <h6 className="font-weight-600">
                          <Link to={`/course-details-one/${c.id}`} className="text-blue">
                            {c.title}
                          </Link>
                        </h6>
                        <p className="mb-1">${c.price}</p>
                        <div className="rating text-primary">
                          <span>{c.ratings?.length ? (c.ratings.reduce((a, b) => a + b.rating, 0) / c.ratings.length).toFixed(1) : "0.0"}</span>
                          <i className="fas fa-star ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SectionTwo>
  );
};

export default CourseDetailsOne;
