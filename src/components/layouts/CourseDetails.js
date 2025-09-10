import React, { useState } from "react";
import PayPalModal from "../PayPalModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CourseDetails = ({
  show,
  onClose,
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
  ratings
}) => {
  const { t } = useTranslation();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const CurrentUser = useSelector((state) => state.user);

  if (!show) return null;

  return (
    <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered h-100"
        style={{
          maxWidth: "80%",
          width: "100%",
          maxHeight: "70vh",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          className="modal-content h-100"
          style={{
            backgroundColor: "#f2e8cf",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="modal-header"
            style={{
              borderBottom: "2px solid #e2c8a9",
              padding: "15px 20px",
              backgroundColor: "#f1d9b8",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <h5 className="modal-title" style={{ fontWeight: "bold", color: "#333", textTransform: "uppercase" }}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{
                backgroundColor: "#e1b28b",
                border: "none",
                fontSize: "1.2rem",
              }}
            ></button>
          </div>

          <div className="modal-body" style={{ padding: "20px", overflowY: "auto" }}>
            <div className="row">
              <div className="col-md-6" style={{ padding: "10px" }}>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Category")}:</strong> {category}
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Description")}:</strong> {description}
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Price")}:</strong> ${price}
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Tutor")}:</strong> {tutor}
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Date")}:</strong> {new Date(date).toLocaleDateString("en-GB")}
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Level")}:</strong> {level}
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Duration")}:</strong> {duration} hours
                </p>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                  <strong>{t("Language")}:</strong> {language}
                </p>
              </div>

              <div className="col-md-6" style={{ padding: "10px" }}>
                <h6 style={{ fontSize: "1.2rem", color: "#333", marginBottom: "10px" }}>
                  <strong>{t("Course Content")}:</strong>
                </h6>
                <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                  {syllabus}
                </ul>

                <h6 style={{ fontSize: "1.2rem", color: "#333", marginTop: "20px" }}>
                  <strong>{t("Requirements")}</strong>
                </h6>
                <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                  {requirements}
                </ul>

                <h6 style={{ fontSize: "1.2rem", color: "#333", marginTop: "20px" }}>
                  <strong>{t("Reviews")}</strong>
                </h6>
                {ratings.length > 0 ? (
                  ratings.map((review, index) => (
                    <p key={index} style={{ fontSize: "1.1rem", color: "#555" }}>
                      <strong>{review.user_name}:</strong> {review.comment} ({review.rating}★)
                    </p>
                  ))
                ) : (
                  <p style={{ fontSize: "1.1rem", color: "#555" }}>No reviews yet.</p>
                )}
              </div>
            </div>
          </div>

          <div
            className="modal-footer"
            style={{
              padding: "15px 20px",
              backgroundColor: "#f1d9b8",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{
                backgroundColor: "#c8a77d",
                color: "#fff",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {t("Close")}
            </button>
            <Link
              to={`/course-details-one/${id}`} 
              className="btn btn-primary btn-block"

            >
              {t("See Details")}
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCheckoutOpen(true)}
              style={{ backgroundColor: "#e1b28b", color: "#fff" }}
            >
             {t("Buy")} ${price}
            </button>
            <PayPalModal
              show={checkoutOpen}
              onClose={() => setCheckoutOpen(false)}
              title={title}
              price={price}
              courseId={id}
              studentId={CurrentUser.idUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
