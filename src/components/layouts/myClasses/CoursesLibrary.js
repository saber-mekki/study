import { useEffect, useState } from "react";

import { CourseDetailStudent } from "./CourseDetailStudent";
import { useSelector } from "react-redux";

export function CoursesLibrary() {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const CurrentUser = useSelector((state) => state.user);


  useEffect(() => {
    const fetchPurchases = async () => {
      const res = await fetch(  `${process.env.REACT_APP_API_BASE_URL}/purchases/user/${CurrentUser.idUser}` );
      const data = await res.json();
      
      const formattedCourses = data.purchases && data.purchases.map(course => ({
        id: course.id,
        title: course.title,
        image: course.image || "/assets/default-course.jpg",
      }));
      setLoading(false)
      setCourses(formattedCourses);
    };
    fetchPurchases();
  }, [CurrentUser.idUser]);

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
      <h2 className="mb-4">Mes formations </h2>

      {loading ||courses === undefined ? (
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
