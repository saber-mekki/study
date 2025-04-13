import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function BannerOne() {
  const { t } = useTranslation();
  const [tutors, setTutors] = useState([]);
  const [filters, setFilters] = useState({
    subject: "",
    country: "",
    language: "",
    price: "",
    gender: "",
    type: ""
  });

  const [filteredTutors, setFilteredTutors] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const results = tutors.filter((tutor) => {
      const matchesSubject =
        filters.subject === "" || tutor.specialty?.toLowerCase() === filters.subject.toLowerCase();

      const matchesCountry =
        filters.country === "" || tutor.country === filters.country;

      const matchesLanguage =
        filters.language === "" || tutor.languages?.includes(filters.language);

      const matchesGender =
        filters.gender === "" || tutor.gender === filters.gender;

      /*     const matchesType =
            filters.type === "" || tutor.type === filters.type; */

      let matchesPrice = true;
      if (filters.price !== "") {
        const [min, max] = filters.price.split("-").map(Number);
        const tutorPrice = Number(tutor.price_per_hour);
        matchesPrice = max
          ? tutorPrice >= min && tutorPrice <= max
          : tutorPrice >= min;
      }

      return (
        matchesSubject &&
        matchesCountry &&
        matchesLanguage &&
        matchesPrice &&
        matchesGender
        /* matchesType */
      );
    });

    setFilteredTutors(results);
    console.log("Filtered Tutors:", results);
  };


  return (
    <section
      className="banner-1 p-5 has-overlay bg-cover"
      style={{ backgroundImage: "url(assets/images/banner-image-00.jpg)" }}
    >
      <div className="">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-sm-8 text-center text-md-left">
            <div className="text-white">
              <h2 className="text-lg mb-30">
                {t("findThe")}{" "}
                <span className="has-line line-primary">
                  {t("perfectTutor")}
                </span>{" "}
                {t("forOnline")} &{" "}
                <span className="has-line">{t("offline")}</span>
              </h2>
              <p
                className="h4 px-2 bg-primary text-white rounded"
                style={{ width: "fit-content" }}
              >
                {t("educationEasy")}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-10 mt-5 mt-md-0">
            <form className="search-form rounded" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-lg-6">
                  <select name="subject" className="form-select" onChange={handleChange} value={filters.subject}>
                    <option value="">{t("selectSubject")}</option>
                    <option value="Development">{t("development")}</option>
                    <option value="Design">{t("design")}</option>
                    <option value="Marketing">{t("marketing")}</option>
                    <option value="Lifestyle">{t("lifestyle")}</option>
                    <option value="IT & Software">{t("itSoftware")}</option>
                    <option value="Personal">{t("personal")}</option>
                    <option value="Business">{t("business")}</option>
                    <option value="Music">{t("music")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="country" className="form-select" onChange={handleChange} value={filters.country}>
                    <option value="">{t("selectCountry")}</option>
                    <option value="Tunisia">{t("tunisia")}</option>
                    <option value="Germany">{t("germany")}</option>
                    <option value="USA">{t("usa")}</option>
                    <option value="UK">{t("uk")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="language" className="form-select" onChange={handleChange} value={filters.language}>
                    <option value="">{t("selectLanguage")}</option>
                    <option value="English">{t("english")}</option>
                    <option value="Detush">{t("detush")}</option>
                    <option value="Arabic">{t("arabic")}</option>
                    <option value="French">{t("french")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="price" className="form-select" onChange={handleChange} value={filters.price}>
                    <option value="">{t("pricePerHour")}</option>
                    <option value="0-10">0 - 10 USD</option>
                    <option value="10-20">10 - 20 USD</option>
                    <option value="20-30">20 - 30 USD</option>
                    <option value="30-50">30 - 50 USD</option>
                    <option value="50+">50+ USD</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="gender" className="form-select" onChange={handleChange} value={filters.gender}>
                    <option value="">{t("selectGender")}</option>
                    <option value="Male">{t("male")}</option>
                    <option value="Female">{t("female")}</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <select name="type" className="form-select" onChange={handleChange} value={filters.type}>
                    <option value="">{t("selectType")}</option>
                    <option value="courses">{t("teachingCourses")}</option>
                    <option value="meetings">{t("onlineMeetings")}</option>
                  </select>
                </div>

                <div className="col-lg-12 mt-3">
                  <button type="submit" className="btn btn-primary rounded-pill w-100">
                    {t("searchTutor")}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>

        {filteredTutors.length > 0 && (
          <div className="row mt-4">
            {filteredTutors.map((tutor) => (
              <div key={tutor._id} className="col-md-4">
                <div className="card p-3 mb-3">
                  <h5>{tutor.user_name}</h5>
                  <p>{t("country")}: {tutor.country}</p>
                  <p>{t("spea")}: {tutor.specialty}</p>
                  <p>{t("language")}: {tutor.languages}</p>
                  <p>{t("pricePerHour")}: ${tutor.price_per_hour}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BannerOne;
