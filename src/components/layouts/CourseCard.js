import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseDetails from "./CourseDetails";

export default function CourseCard({
  id,
  title,
  category,
  price,
  description,
  imageUrl,
  date,
  tutor,
  level,
  duration,
  language,
  syllabus,
  requirements,
}) {
  const [selectedCourse, setSelectedCourse] = useState(false);

  const handleOpenModal = () => {
    setSelectedCourse(true);
  };

  const handleClose = () => {
    setSelectedCourse(false);
  };

  return (
    <>
      <div onClick={handleOpenModal} className="col-lg-4 col-md-5 col-sm-6">
        <div className="card course-card shadow mt-40">
          <img
            className="card-img-top"
            src={imageUrl ? imageUrl : "/assets/images/course-single.jpg"}
            style={{ width: "350px", height: "200px" }}
            alt="Course preview"
          />
          <div className="card-body p-30">
            <h5 className="font-weight-600">
              <Link to={`/courses/${id}`} className="text-blue">
                {title}
              </Link>
            </h5>
            <p className="mt-2">{description}</p>
            <div className="d-flex justify-content-end w-100">
              <div>{tutor}</div>
            </div>
            <div className="d-flex justify-content-end w-100">
              <div>{new Date(date).toLocaleDateString("en-GB")}</div>
            </div>
          </div>
          <div className="px-30">
            <div className="card-footer px-0 bg-transparent mb-10 d-flex justify-content-between align-items-center">
              <div className="rating text-primary">
                <span className="font-weight-600">4.3</span>
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="price h6">
                <span style={{ color: "green" }}>${price}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedCourse && (
        <CourseDetails
          show={selectedCourse !== null}
          key={id}
          id={id}
          title={title}
          category={category}
          price={price}
          description={description}
          tutor={tutor}
          date={date}
          duration={duration}
          level={level}
          language={language}
          syllabus={syllabus}
          requirements={requirements}
          onClose={handleClose}
        />
      )}
    </>
  );
}
