import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "9999px",
      padding: "4px 8px",
      borderColor: state.isFocused ? "#0d6efd" : "#ced4da",
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(13, 110, 253, 0.25)" : "none",
      "&:hover": {
        borderColor: "#0d6efd",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999, 
      borderRadius: "10px",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e9ecef" : "white",
      color: "black",
      cursor: "pointer",
      padding: "10px",
    }),
  };
  
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

  const handleChange = (name, selectedOption) => {
    setFilters(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : "" }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = tutors.filter((tutor) => {
      const matchesSubject = filters.subject === "" || tutor.specialty?.toLowerCase() === filters.subject.toLowerCase();
      const matchesCountry = filters.country === "" || tutor.country === filters.country;
      const matchesLanguage = filters.language === "" || tutor.languages?.includes(filters.language);
      const matchesGender = filters.gender === "" || tutor.gender === filters.gender;

      let matchesPrice = true;
      if (filters.price !== "") {
        const [min, max] = filters.price.split("-").map(Number);
        const tutorPrice = Number(tutor.price_per_hour);
        matchesPrice = max
          ? tutorPrice >= min && tutorPrice <= max
          : tutorPrice >= min;
      }

      return matchesSubject && matchesCountry && matchesLanguage && matchesPrice && matchesGender;
    });

    setFilteredTutors(results);
  };

  
  const subjectOptions = [
    { value: "", label: t("selectSubject") },
    { value: "Development", label: t("development") },
    { value: "Design", label: t("design") },
    { value: "Marketing", label: t("marketing") },
    { value: "Lifestyle", label: t("lifestyle") },
    { value: "IT & Software", label: t("itSoftware") },
    { value: "Personal", label: t("personal") },
    { value: "Business", label: t("business") },
    { value: "Music", label: t("music") }
  ];

  const countryOptions = [
    { value: "", label: t("selectCountry") },
    { value: "Tunisia", label: t("tunisia") },
    { value: "Germany", label: t("germany") },
    { value: "USA", label: t("usa") },
    { value: "UK", label: t("uk") }
  ];

  const languageOptions = [
    { value: "", label: t("selectLanguage") },
    { value: "English", label: t("english") },
    { value: "Detush", label: t("detush") },
    { value: "Arabic", label: t("arabic") },
    { value: "French", label: t("french") }
  ];

  const priceOptions = [
    { value: "", label: t("pricePerHour") },
    { value: "0-10", label: "0 - 10 USD" },
    { value: "10-20", label: "10 - 20 USD" },
    { value: "20-30", label: "20 - 30 USD" },
    { value: "30-50", label: "30 - 50 USD" },
    { value: "50+", label: "50+ USD" }
  ];

  const genderOptions = [
    { value: "", label: t("selectGender") },
    { value: "Male", label: t("male") },
    { value: "Female", label: t("female") }
  ];

  const typeOptions = [
    { value: "", label: t("selectType") },
    { value: "courses", label: t("teachingCourses") },
    { value: "meetings", label: t("onlineMeetings") }
  ];

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
                <span className="has-line line-primary">{t("perfectTutor")}</span>{" "}
                {t("forOnline")} &{" "}
                <span className="has-line">{t("offline")}</span>
              </h2>
              <p className="h4 px-2 bg-primary text-white rounded" style={{ width: "fit-content" }}>
                {t("educationEasy")}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-10 mt-5 mt-md-0">
            <form className="search-form rounded" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Select
                    name="subject"
                    options={subjectOptions}
                    value={subjectOptions.find(opt => opt.value === filters.subject)}
                    onChange={(opt) => handleChange("subject", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="country"
                    options={countryOptions}
                    value={countryOptions.find(opt => opt.value === filters.country)}
                    onChange={(opt) => handleChange("country", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="language"
                    options={languageOptions}
                    value={languageOptions.find(opt => opt.value === filters.language)}
                    onChange={(opt) => handleChange("language", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="price"
                    options={priceOptions}
                    value={priceOptions.find(opt => opt.value === filters.price)}
                    onChange={(opt) => handleChange("price", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="gender"
                    options={genderOptions}
                    value={genderOptions.find(opt => opt.value === filters.gender)}
                    onChange={(opt) => handleChange("gender", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="type"
                    options={typeOptions}
                    value={typeOptions.find(opt => opt.value === filters.type)}
                    onChange={(opt) => handleChange("type", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-12">
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
