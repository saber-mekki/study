import React, { useEffect, useState } from "react";
import { PdfViewer } from "./PDFViewer";
import { useSelector } from "react-redux";


export function CourseDetailStudent({ course_Id }) {

  const [ratings, setRatings] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const CurrentUser = useSelector((state) => state.user);


  const [hover, setHover] = useState(0);
 
  useEffect(() => {
    const fetchRatings = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rating/course/${course_Id}`);
      const data = await res.json();
      setRatings(data.ratings);
    };
    fetchRatings();
  }, [course_Id,ratings]);

  const submitRating = async () => {
    if (rating === 0) {
      alert("Veuillez choisir une note ⭐");
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rating/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId:course_Id,
        userId: CurrentUser.idUser,
        rating,
        comment,
      }),
    });
    const data = await res.json();
   
    if (data.rating) {
      setRatings([data.rating, ...ratings]);
      setRating(0);
      setComment("");
    }
  };

  const course = {
    title: "Introduction à React",
    description: "Ce cours couvre les bases de la bibliothèque React.js.",
    pdfs: [
      { description: "Chapitre 1 - Introduction", file: "/assets/react.pdf" },
      { description: "Chapitre 2 - Composants", file: "/assets/pdfs/composants.pdf" },
      { description: "Chapitre 3 - États et Props", file: "/assets/pdfs/etats_props.pdf" },
      { description: "Chapitre 4 - Cycle de vie", file: "/assets/pdfs/cycle_vie.pdf" },
      { description: "Chapitre 5 - Hooks avancés", file: "/assets/pdfs/hooks_avances.pdf" },
    ],
    videos: [
       { description: "Vidéo 1 - Présentation", file: "/assets/react.mp4" },
      { description: "Vidéo 2 - Hooks de base", file: "/assets/videos/hooks.mp4" },
      { description: "Vidéo 3 - Gestion d'état avec useState", file: "/assets/videos/useState.mp4" },
      { description: "Vidéo 4 - Effets avec useEffect", file: "/assets/videos/useEffect.mp4" },
      { description: "Vidéo 5 - Context API", file: "/assets/videos/context.mp4" },
      { description: "Vidéo 6 - Optimisation des performances", file: "/assets/videos/performance.mp4" },
    ],
  };

  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  return (
    <>
    
    <div className="container mt-5">
      <h2 className="mb-3">{course.title}</h2>
      <p className="text-muted">{course.description}</p>

      <hr />

      <h4 className="mt-4 mb-3">📄 Documents PDF</h4>

      <div className="pdf-chapters-container mb-4">
        {course.pdfs.map((pdf, index) => (
          <button
            key={index}
            className={`pdf-chapter-btn ${selectedPdfIndex === index ? "active" : ""}`}
            onClick={() => setSelectedPdfIndex(index)}
          >
            {pdf.description}
          </button>
        ))}
      </div>

      {course.pdfs[selectedPdfIndex] && (
        <PdfViewer file={course.pdfs[selectedPdfIndex].file} />
      )}

      <hr />

      <h4 className="mt-5 mb-3">🎥 Vidéos</h4>

      <div className="pdf-chapters-container mb-4">
        {course.videos.map((video, index) => (
          <button
            key={index}
            className={`pdf-chapter-btn ${selectedVideoIndex === index ? "active" : ""}`}
            onClick={() => setSelectedVideoIndex(index)}
          >
            {video.description}
          </button>
        ))}
      </div>

      {course.videos[selectedVideoIndex] && (
        <>
          <video controls width="100%" className="mt-2 mb-2 rounded">
            <source src={course.videos[selectedVideoIndex].file} type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
          <br />
          <a
            href={course.videos[selectedVideoIndex].file}
            download
            className="btn btn-outline-success btn-sm"
          >
            Télécharger la vidéo
          </a>
        </>
      )}

<div>
      <h3 className="mb-3">Avis et notes</h3>

      {/* Rating Form */}
      <div className="mb-3">
        <label className="form-label">Votre note :</label>
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

        <label className="form-label mt-2">Commentaire :</label>
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={submitRating}>
          Envoyer
        </button>
      </div>

      {/* Ratings List */}
      <ul className="list-group">
        {ratings&&ratings.map((r) => (
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

</>

  );
}
