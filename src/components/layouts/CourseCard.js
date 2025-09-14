import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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


  const [rate, setRate] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rating/course/${id}`);
      const data = await res.json();
      let rate = 0

      data.ratings.length > 0 && data.ratings.forEach((el) => {

        rate = rate + el.rating
      })
      setRate(data.ratings.length > 0 ? rate / data.ratings.length : 0)
    };

    fetchRatings();
  }, [id]);


  const handleOpenModal = () => {
    if (price === '0.00' ) {
      history.push(`/course/${id}`);
    } else {
      history.push(`/course-details-one/${id}`);
    }
  }

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={handleOpenModal} className="col-lg-4 col-md-5 col-sm-6">
        <div className="card course-card shadow mt-40">
          <img
            className="card-img-top"
            src={imageUrl ? imageUrl : "/assets/images/course-single.jpg"}
            style={{ width: "350px", height: "200px" }}
            alt="Course preview"
          />
          <div className="card-body p-30">
            <h5 className="font-weight-600">
              {title}
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
                <span className="font-weight-600">{rate}</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: rate >= star ? "gold" : "lightgray",
                      fontSize: "1.2rem",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="price h6">
                <span style={{ color: "green" }}>${price}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* {selectedCourse && (
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
          ratings={ratings}
        />
      )} */}
    </>
  );
}
