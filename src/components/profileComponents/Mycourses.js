import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CourseCard from '../layouts/CourseCard';

export default function Mycourses({ email }) {  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/GetAllCourses");
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.tutor_email === email 
  );

  return (
    <div className="my-courses">
      <div className="row justify-content-center">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              category={course.category}
              price={course.price}
              description={course.description}
              imageUrl={course.image}
              tutor={course.tutor}
              date={course.date}
              level={course.level}
              duration={course.duration}
              language={course.language}
              syllabus={course.syllabus}
              requirements={course.requirements}
            />
          ))
        ) : (
          <p>No courses found for this tutor.</p>
        )}
      </div>
    </div>
  );
}
