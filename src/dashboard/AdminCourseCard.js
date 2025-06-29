import React, { useState } from "react";
import axios from "axios";

export default function AdminCourseCard({
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

const onDelete = async (courseId) => {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`;
    console.log("Deleting course at:", url);

    const response = await axios.delete(url);

    if (response.status === 200) {
      alert("Course deleted successfully.");
      window.location.reload(); 
    } else {
      console.error("Failed to delete course:", response.data.message);
      alert("Failed to delete course.");
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    alert("An error occurred while deleting the course.");
  }
};



  const confirmDelete = () => {
    setIsDeleting(true);
    onDelete(id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div
      style={{
        width: 350,
        border: "1px solid #ddd",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        marginBottom: 20,
        cursor: "default",
      }}
    >
      <img
        src={imageUrl || "/assets/images/course-single.jpg"}
        alt={title}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />

      <div style={{ padding: 20 }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
      
        <p>
          <strong>Tutor:</strong> {tutor}
        </p>
        <p>
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p>
          <strong>Duration:</strong> {duration}
        </p>
        <p style={{ fontWeight: "bold", fontSize: 18, color: "green" }}>
          Price: ${price}
        </p>

        {!showConfirm && (
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            style={{
              marginTop: 15,
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete Course"}
          </button>
        )}

        {/* Confirm delete */}
        {showConfirm && (
          <div style={{ marginTop: 15 }}>
            <p>Are you sure you want to delete this course?</p>
            <button
              onClick={confirmDelete}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 16px",
                marginRight: 10,
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Yes, delete
            </button>
            <button
              onClick={cancelDelete}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
