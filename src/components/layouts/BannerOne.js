import { React } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setFilter } from "../../redux/TutorsSlice";

function BannerOne() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.searchFilters);
  const dispatch = useDispatch();
  const history = useHistory();

  const customStyles = {
    control: (base, state) => {
      const hasRealValue =
        state.selectProps.value && state.selectProps.value.value !== "";
      return {
        ...base,
        borderRadius: "9999px",
        padding: "4px 8px",
        borderColor: hasRealValue ? "#0d6efd" : "#ced4da",
        backgroundColor: hasRealValue ? "#e7f1ff" : "white",
        boxShadow: "none",
        "&:hover": {
          borderColor: "#0d6efd",
        },
        transition: "all 0.3s",
      };
    },
    singleValue: (base, state) => {
      const hasRealValue =
        state.selectProps.value && state.selectProps.value.value !== "";
      return {
        ...base,
        color: hasRealValue ? "#0d6efd" : base.color,
        fontWeight: hasRealValue ? 500 : base.fontWeight,
      };
    },
    placeholder: (base, state) => {
      const hasRealValue =
        state.selectProps.value && state.selectProps.value.value !== "";
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

  const handleChange = (name, selectedOption) => {
    dispatch(
      setFilter({
        ...filters,
        [name]: selectedOption ? selectedOption.value : "",
      })
    );
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    history.push("/tutors");
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
    { value: "Music", label: t("music") },
  ];

  const countryOptions = [
    { value: "", label: t("selectCountry") },
    { value: "Tunisia", label: t("tunisia") },
    { value: "Germany", label: t("germany") },
    { value: "USA", label: t("usa") },
    { value: "UK", label: t("uk") },
  ];

  const languageOptions = [
    { value: "", label: t("selectLanguage") },
    { value: "English", label: t("english") },
    { value: "Detush", label: t("detush") },
    { value: "Arabic", label: t("arabic") },
    { value: "French", label: t("french") },
  ];

  const priceOptions = [
    { value: "", label: t("pricePerHour") },
    { value: "0-10", label: "0 - 10 USD" },
    { value: "10-20", label: "10 - 20 USD" },
    { value: "20-30", label: "20 - 30 USD" },
    { value: "30-50", label: "30 - 50 USD" },
    { value: "50+", label: "50+ USD" },
  ];

  const genderOptions = [
    { value: "", label: t("selectGender") },
    { value: "male", label: t("male") },
    { value: "female", label: t("female") },
  ];

  const typeOptions = [
    { value: "", label: t("selectType") },
    { value: "courses", label: t("teachingCourses") },
    { value: "meetings", label: t("onlineMeetings") },
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
                <span className="has-line line-primary">
                  {t("perfectTutor")}
                </span>{" "}
                {t("forOnline")} &{" "}
                <span className="has-line">{t("offline")}</span>
                <span className="">{t("Courses")}</span>
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
            <form className="search-form rounded">
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Select
                    name="subject"
                    options={subjectOptions}
                    value={subjectOptions.find(
                      (opt) => opt.value === filters.subject
                    )}
                    onChange={(opt) => handleChange("subject", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="country"
                    options={countryOptions}
                    value={countryOptions.find(
                      (opt) => opt.value === filters.country
                    )}
                    onChange={(opt) => handleChange("country", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="language"
                    options={languageOptions}
                    value={languageOptions.find(
                      (opt) => opt.value === filters.language
                    )}
                    onChange={(opt) => handleChange("language", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="price"
                    options={priceOptions}
                    value={priceOptions.find(
                      (opt) => opt.value === filters.price
                    )}
                    onChange={(opt) => handleChange("price", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="gender"
                    options={genderOptions}
                    value={genderOptions.find(
                      (opt) => opt.value === filters.gender
                    )}
                    onChange={(opt) => handleChange("gender", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Select
                    name="type"
                    options={typeOptions}
                    value={typeOptions.find(
                      (opt) => opt.value === filters.type
                    )}
                    onChange={(opt) => handleChange("type", opt)}
                    classNamePrefix="react-select"
                    styles={customStyles}
                  />
                </div>
                <div className="col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill w-100"
                    onClick={handlesubmit}
                  >
                    {t("searchTutor")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerOne;
