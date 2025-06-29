import React, { useEffect, useState } from "react";
import axios from "axios";
import TutorCard from "./TutorCard";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RecentTutorSection() {
    const { t } = useTranslation();
  
  const [tutors, setTutors] = useState([]);
  const history = useHistory();
  const handleNavigate = () => {
    history.push("/tutors");
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users`
        );
        const users = response.data.result;

        const onlyTutors = users.filter(
          (user) => user.type_register === "tutor"
        );

        const selected = [onlyTutors[0], onlyTutors[1], onlyTutors[3]].filter(
          Boolean
        );

        setTutors(selected);
      } catch (err) {
        alert("Error fetching users: " + err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row align-items-center mb-30">
          <div className="col-lg-9 text-center text-lg-left">
           <h2 className="section-title mb-0">
  {t("recentTutors_title_part1")}{" "}
  <span className="has-line">{t("recentTutors_title_part2")}</span>
</h2>

          </div>
          <div className="col-lg-3 mt-4 mt-lg-0 text-center text-lg-right">
            <span
              onClick={handleNavigate}
              className="text-primary font-weight-600 initiate-scripts"
              style={{ cursor: "pointer" }}
            >
              {t("Show More")}
            </span>
          </div>
        </div>
        <div className="row">
          {tutors.map((tutor, index) => (
            <TutorCard
              key={tutor.id}
              name={tutor.user_name}
              specialty={tutor.specialty}
              country={tutor.country}
              price={tutor.price_per_hour}
              languages={tutor.languages}
              rating={tutor.rating}
              bio={tutor.bio}
              image={tutor.image}
              id={tutor.user_id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentTutorSection;
