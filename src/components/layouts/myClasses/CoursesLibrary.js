import { useEffect, useState } from "react";
import axios from "axios";
import { CourseDetailStudent } from "./CourseDetailStudent";

export function CoursesLibrary() {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/GetAllCourses");
        const formattedCourses = response.data.courses.map(course => ({
          id: course.id,
          title: course.title,
          image: course.image || "/assets/default-course.jpg",
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (selectedCourseId) {
    return (
      <div className="container mt-4">
        <button className="btn btn-secondary mb-4" onClick={() => setSelectedCourseId("")}>
          ← Retour à la liste des cours
        </button>
        <CourseDetailStudent course_Id={selectedCourseId} />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📚 Liste des formations disponibles</h2>

      {loading ? (
        <p>Chargement des cours...</p>
      ) : courses.length === 0 ? (
        <p className="text-muted">Aucune formation disponible pour le moment.</p>
      ) : (
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{course.title}</h5>
                  <button
                    onClick={() => setSelectedCourseId(course.id)}
                    className="btn btn-primary mt-3"
                  >
                    Voir le cours
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
