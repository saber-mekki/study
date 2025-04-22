import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useTranslation } from "react-i18next";


export default function CourseSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/GetAllCourses");
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
        
          <div className="col-lg-12">
            <div className="nav-scrollable">
              <nav className="nav d-flex justify-content-between">
                <Link to="#" onClick={() => setSelectedCategory("All")} className={selectedCategory === "All" ? "active" : ""}>{t("All")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Development")} className={selectedCategory === "Development" ? "active" : ""}>{t("Development")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Design")} className={selectedCategory === "Design" ? "active" : ""}>{t("Design")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Marketing")} className={selectedCategory === "Marketing" ? "active" : ""}>{t("Marketing")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Lifestyle")} className={selectedCategory === "Lifestyle" ? "active" : ""}>{t("Lifestyle")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("IT & Software")} className={selectedCategory === "IT & Software" ? "active" : ""}>{t("IT & Software")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Personal")} className={selectedCategory === "Personal" ? "active" : ""}>{t("Personal")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Business")} className={selectedCategory === "Business" ? "active" : ""}>{t("Business")}</Link>
                <Link to="#" onClick={() => setSelectedCategory("Music")} className={selectedCategory === "Music" ? "active" : ""}>{t("Music")}</Link>
              </nav>
            </div>
          </div>
        </div>

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
            <p>{t("No courses available in this category")}.</p>
          )}
        </div>
      </div>
    </section>
  );
}
