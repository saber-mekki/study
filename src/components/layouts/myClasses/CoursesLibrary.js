import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { CourseDetailStudent } from "./CourseDetailStudent";

export function CoursesLibrary() {

   // const [loading, setLoading] = useState(true);

    const [id, setId] = useState("");
    
    const [courses, setCourses] = useState([]);

      useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/v1/GetAllCourses");
            setCourses(response.data.courses.map((elem)=>{return {id:elem.id,title:elem.title,image:elem.image}}))
          } catch (error) {
            console.log("Error fetching courses:", error);
          } finally {
           // setLoading(false);
          }
        };
    
        fetchCourses();
      }, []);
      
    return (
      <> 
      {id ===""?<div className="container mt-5">
            <h2 className="mb-4">Available Courses</h2>
            <div className="row">
                {courses.map(course => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={course.image}
                                className="card-img-top"
                                alt={course.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title">{course.title}</h5>
                                <Link onClick={()=> setId(course.id)} className="btn btn-primary mt-3">
                                    View Course
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>:<CourseDetailStudent course_Id={id}/>}</>
       
    );
}
