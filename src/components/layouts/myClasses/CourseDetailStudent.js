import { useEffect, useState } from "react";
import axios from "axios";

export function CourseDetailStudent({ course_Id }) {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses/${course_Id}`)
      .then(res =>
        setCourses(res.data)

      )

      .catch(err => console.error(err));
  }, [course_Id]);

  if (!courses) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{courses.title}</h2>
      <p className="text-muted">{courses.description}</p>
      <h5 className="mt-4">courses Document</h5>
      {courses.pdfs && courses.pdfs.map((elem, index) =>
        <>
          <div>{elem.description}</div>
          <iframe
            src={elem.file}
            width="100%"
            height="600px"
            className="mb-3"
            title="PDF Viewer"
          ></iframe>
          <a href={elem.file} download className="btn btn-outline-secondary">
            Download PDF
          </a>
        </>
      )}
      <h5 className="mt-5">courses Video</h5>
      {courses.videos && courses.videos.map((elem, index) =>
        <>
          <div>{elem.description}</div>
          <video controls width="100%" className="mb-3">
            <source src={elem.file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <a href={elem.file} download className="btn btn-outline-secondary">
            Download Video
          </a>
        </>
      )}
    </div>
  );
}
