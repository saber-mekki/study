import React, { useEffect, useState } from "react";
import { PdfViewer } from "./PDFViewer";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export function CourseDetailStudent() {
  const { t } = useTranslation();
  const CurrentUser = useSelector((state) => state.user);
 const { id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const [course, setCourse] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/courses/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // ---- Fetch ratings ----
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/rating/course/${id}`
        );
        const data = await res.json();
        setRatings(data.ratings || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRatings();
  }, [id]);

  const submitRating = async () => {
    if (rating === 0) {
      alert(`${t("Veuillez choisir une note")} ⭐`);
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/rating/courses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: id,
          userId: CurrentUser.idUser,
          rating,
          comment,
        }),
      }
    );
    const data = await res.json();
    if (data.rating) {
      setRatings([data.rating, ...ratings]);
      setRating(0);
      setComment("");
    }
  };

  if (loading) return <div>{t("Chargement du cours...")}</div>;
  if (!course) return <div>{t("Cours introuvable")}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">{course.title}</h2>
      <p className="text-muted">{course.description}</p>

      <hr />

      <h4 className="mt-4 mb-3">📄 {t("Documents PDF")}</h4>
      <div className="pdf-chapters-container mb-4">
        {course.pdfs?.map((pdf, index) => (
          <button
            key={pdf.id || index}
            className={`pdf-chapter-btn ${
              selectedPdfIndex === index ? "active" : ""
            }`}
            onClick={() => setSelectedPdfIndex(index)}
          >
            {pdf.description}
          </button>
        ))}
      </div>
      {course.pdfs?.[selectedPdfIndex] && (
        <PdfViewer file={course.pdfs[selectedPdfIndex].signed_url} />
      )}

      <hr />

      <h4 className="mt-5 mb-3">🎥 {t("Vidéos")}</h4>
      <div className="pdf-chapters-container mb-4">
        {course.videos?.map((video, index) => (
          <button
            key={video.id || index}
            className={`pdf-chapter-btn ${
              selectedVideoIndex === index ? "active" : ""
            }`}
            onClick={() => setSelectedVideoIndex(index)}
          >
            {video.description}
          </button>
        ))}
      </div>
      {course.videos?.[selectedVideoIndex] && (
        <>
          <video controls width="100%" className="mt-2 mb-2 rounded">
            <source
              src={course.videos[selectedVideoIndex].signed_url}
              type="video/mp4"
            />
            {t("Votre navigateur ne prend pas en charge la lecture vidéo.")}
          </video>
          <br />
          <a
            href={course.videos[selectedVideoIndex].signed_url}
            download
            className="btn btn-outline-success btn-sm"
          >
            {t("Télécharger la vidéo")}
          </a>
        </>
      )}

      {/* ---- Ratings Section ---- */}
      <div>
        <h3 className="mb-3">{t("Avis et notes")}</h3>
        <div className="mb-3">
          <label className="form-label">{t("Votre note")} :</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: (hover || rating) >= star ? "gold" : "lightgray",
                }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>

          <label className="form-label mt-2">{t("Commentaire")}:</label>
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={submitRating}>
            {t("Envoyer")}
          </button>
        </div>

        <ul className="list-group">
          {ratings.map((r) => (
            <li key={r.id} className="list-group-item">
              <div>
                <strong>{r.name}</strong>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: r.rating >= star ? "gold" : "lightgray",
                        fontSize: "1.2rem",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="mb-0">{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
