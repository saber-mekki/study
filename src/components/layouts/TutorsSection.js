import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TutorCard from "./TutorCard";

export default function TutorsSection() {
  const [tutors, setTutors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
        const users = response.data.result;
        const onlyTutors = users.filter(user => user.type_register === "tutor");
        setTutors(onlyTutors);
      } catch (err) {
        alert("Error fetching users: " + err.message);
      }
    };

    fetchUsers();
  }, []);






  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-30">
            <h2 className="section-title">Largest Selection Of Tutors</h2>
          </div>
          <div className="col-lg-12">
            <div className="nav-scrollable">
              <nav className="nav d-flex justify-content-between">
                <Link to="#" onClick={() => setSelectedCategory("All")} className={selectedCategory === "All" ? "active" : ""}>All</Link>
                <Link to="#" onClick={() => setSelectedCategory("Development")} className={selectedCategory === "Development" ? "active" : ""}>Development</Link>
                <Link to="#" onClick={() => setSelectedCategory("Design")} className={selectedCategory === "Design" ? "active" : ""}>Design</Link>
                <Link to="#" onClick={() => setSelectedCategory("Marketing")} className={selectedCategory === "Marketing" ? "active" : ""}>Marketing</Link>
                <Link to="#" onClick={() => setSelectedCategory("Lifestyle")} className={selectedCategory === "Lifestyle" ? "active" : ""}>Lifestyle</Link>
                <Link to="#" onClick={() => setSelectedCategory("IT & Software")} className={selectedCategory === "IT & Software" ? "active" : ""}>IT & Software</Link>
                <Link to="#" onClick={() => setSelectedCategory("Personal")} className={selectedCategory === "Personal" ? "active" : ""}>Personal</Link>
                <Link to="#" onClick={() => setSelectedCategory("Business")} className={selectedCategory === "Business" ? "active" : ""}>Business</Link>
                <Link to="#" onClick={() => setSelectedCategory("Music")} className={selectedCategory === "Music" ? "active" : ""}>Music</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="row justify-content-center m-5">
          {tutors ? (
            tutors.map((tutor) => (
              <TutorCard
                name={tutor.user_name}
                specialty={tutor.specialty}
              country={tutor.country}
              price={tutor.price_per_hour}
              languages={tutor.languages}
              rating={tutor.rating}
              bio={tutor.bio}
              image
              />
            ))
          ) : (
            <p>No courses available in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}
