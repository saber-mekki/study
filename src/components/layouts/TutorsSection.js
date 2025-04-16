import React, { useEffect, useState } from "react";
import axios from "axios";
import TutorCard from "./TutorCard";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { setFilter } from '../../redux/TutorsSlice';
import Select from "react-select";

export default function TutorsSection() {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);

  const { t } = useTranslation();
  const filters = useSelector((state) => state.searchFilters);
  const dispatch = useDispatch();

  const { subject, country, language, price, gender/* , type */ } = useSelector((state) => state.searchFilters);
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

  useEffect(() => {
    const filtered = tutors.filter((tutor) => {
      const matchesSubject =
        subject === "" || tutor.specialty?.toLowerCase() === subject.toLowerCase();

      const matchesCountry =
        country === "" || tutor.country === country;

      const matchesLanguage =
        language === "" || tutor.languages?.includes(language);

      const matchesGender =
        gender === "" || tutor.gender === gender;

      let matchesPrice = true;
      if (price !== "") {
        const [min, max] = price.split("-").map(Number);
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
      );
    });

    setFilteredTutors(filtered);
  }, [tutors, subject, country, language, price, gender]);

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
    { value: "male", label: t("male") },
    { value: "female", label: t("female") }
  ];

  const typeOptions = [
    { value: "", label: t("selectType") },
    { value: "courses", label: t("teachingCourses") },
    { value: "meetings", label: t("onlineMeetings") }
  ];
   const handleChange = (name, selectedOption) => {
      dispatch(setFilter({ ...filters, [name]: selectedOption ? selectedOption.value : "" }));
    };
  

    const customStyles = {
      control: (base, state) => {
        const hasRealValue = state.selectProps.value && state.selectProps.value.value !== "";
        return {
          ...base,
          borderRadius: "9999px",
          padding: "4px 8px",
          borderColor: hasRealValue ? "#caf0f8" : "#ced4da",
          backgroundColor: hasRealValue ? "#e7f1ff" : "white",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#0d6efd",
          },
          transition: "all 0.3s",
        };
      },
      singleValue: (base, state) => {
        const hasRealValue = state.selectProps.value && state.selectProps.value.value !== "";
        return {
          ...base,
          color: hasRealValue ? "#0d6efd" : base.color,
          fontWeight: hasRealValue ? 500 : base.fontWeight,
        };
      },
      placeholder: (base, state) => {
        const hasRealValue = state.selectProps.value && state.selectProps.value.value !== "";
        return {
          ...base,
          color: hasRealValue ? "#0d6efd" : "#6c757d",
        };
      },
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "#0d6efd"
          : state.isFocused
          ? "#e9ecef"
          : "white",
        color: state.isSelected ? "white" : "black",
        cursor: "pointer",
        padding: "10px",
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9999,
        borderRadius: "10px",
        overflow: "hidden",
      }),
    };
    
  return (
    <section className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-12 h4 text-center mb-30">
            <span className="section-title">Largest Selection Of Tutors</span>
          </div>
        
        </div>


        <form className="mb-4">
  <div className="row">
    <div className="col-md-2 mb-2">
      <Select
        name="subject"
        options={subjectOptions}
        value={subjectOptions.find(opt => opt.value === filters.subject)}
        onChange={(opt) => handleChange("subject", opt)}
        classNamePrefix="react-select"
        styles={customStyles}

      />
    </div>
    <div className="col-md-2 mb-2">
      <Select
        name="country"
        options={countryOptions}
        value={countryOptions.find(opt => opt.value === filters.country)}
        onChange={(opt) => handleChange("country", opt)}
        classNamePrefix="react-select"
        styles={customStyles}

      />
    </div>
    <div className="col-md-2 mb-2">
      <Select
        name="language"
        options={languageOptions}
        value={languageOptions.find(opt => opt.value === filters.language)}
        onChange={(opt) => handleChange("language", opt)}
        classNamePrefix="react-select"
        styles={customStyles}

      />
    </div>
    <div className="col-md-2 mb-2">
      <Select
        name="price"
        options={priceOptions}
        value={priceOptions.find(opt => opt.value === filters.price)}
        onChange={(opt) => handleChange("price", opt)}
        classNamePrefix="react-select"
        styles={customStyles}

      />
    </div>
    <div className="col-md-2 mb-2">
      <Select
        name="gender"
        options={genderOptions}
        value={genderOptions.find(opt => opt.value === filters.gender)}
        onChange={(opt) => handleChange("gender", opt)}
        classNamePrefix="react-select"
        styles={customStyles}

      />
    </div>
    <div className="col-md-2 mb-2">
      <Select
        name="type"
        options={typeOptions}
        value={typeOptions.find(opt => opt.value === filters.type)}
        onChange={(opt) => handleChange("type", opt)}
        classNamePrefix="react-select"
        styles={customStyles}

      />
    </div>
  </div>
</form>


        <div className="row justify-content-center m-5">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
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
            ))
          ) : (
         
            <div className="col-12 h2 text-center mb-30">
            <span className="d">Sorry, we couldn't find any tutors that match your search.</span>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
