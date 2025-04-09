import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { v4 as uuidv4 } from "uuid";


export default function AddCourse({ email }) {
  const { t } = useTranslation();

  const history = useHistory();
  const [course, setCourse] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    image: null,
    level: "",
    duration: "",
    language: "",
    syllabus: "",
    requirements: "",
  });
  const [pdfOne, setPdfOne] = useState(null);
  const [pdfOnePreview, setPdfOnePreview] = useState(null);

  const [pdfTwo, setPdfTwo] = useState(null);
  const [pdfTwoPreview, setPdfTwoPreview] = useState(null);

  const [PDF, setPDF] = useState(false);

  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState(false);


  const handlePDF = (e) => {
    setPDF(true)
    setDetails(false)

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleDetails = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!course.title) validationErrors.title = t("titleRequired");
    if (!course.category) validationErrors.category = t("categoryRequired");
    if (!course.price) validationErrors.price = t("priceRequired");
    if (!course.description) validationErrors.description = t("descriptionRequired");
    if (!course.image) validationErrors.image = t("imageRequired");

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setDetails(true);
  };

  const onClose = () => {
    setDetails(false);
    setPDF(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Myid = uuidv4();

    let validationErrors = {};

    if (!course.level) validationErrors.level = t("levelRequired");
    if (!course.duration) validationErrors.duration = t("durationRequired");
    if (!course.language) validationErrors.language = t("languageRequired");
    if (!course.syllabus) validationErrors.syllabus = t("syllabusRequired");
    if (!course.requirements) validationErrors.requirements = t("requirementsRequired");

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/CreateCourse", {
        id: Myid,
        title: course.title,
        category: course.category,
        price: course.price,
        description: course.description,
        image: course.image,
        tutor: user.name,
        date: new Date().toISOString().split("T")[0],
        level: course.level,
        duration: course.duration,
        language: course.language,
        syllabus: course.syllabus,
        requirements: course.requirements,
        tutor_email: email,
      });

      setDetails(false);

    } catch (error) {
      console.error("Error creating course:", error.response || error.message);
    }

    try {
      await axios.post("http://localhost:5000/api/v1/uploadpdf", {
        course_id: Myid,
        pdfFile: pdfOne,
      });

      setDetails(false);
      history.push("/courses");

    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message || t("errors.uploadPDF")
        : error.message || t("errors.network");

      alert(`Error PDF: ${errorMessage}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="card-title text-center mb-3">{t("add_new_course")}</h2>
          <div className="card p-3 shadow">
            <h2 className="card-title text-center mb-3">{t("course")}</h2>
            <form>
              <div className="row mb-2">
                <div className="col-md-4">
                  <label htmlFor="title" className="form-label">
                    {t("Course Title")}
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={course.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    required
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="col-md-4">
                  <label htmlFor="category" className="form-label">
                    {t("Category")}
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={course.category}
                    onChange={handleChange}
                    className={`form-control ${errors.category ? "is-invalid" : ""}`}
                    required
                  >
                    <option value="">{t("Select a Category")}</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Music">Music</option>
                  </select>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>

                <div className="col-md-4">
                  <label htmlFor="price" className="form-label">
                    {t("Price ($)")}
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={course.price}
                    onChange={handleChange}
                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                    required
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="description" className="form-label">
                  {t("Course Description")}
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={course.description}
                  onChange={handleChange}
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  minLength="20"
                  maxLength="100"
                  required
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="mb-2">
                <label htmlFor="image" className="form-label">
                  {t("Course Image")}
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  required
                />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>

              <button
                type="button"
                onClick={handleDetails}
                className="btn btn-primary w-100"
              >
                {t("Next")}
              </button>
            </form>

          </div>
        </div>
      </div>

      {details && (
  <div
    className="modal fade show d-flex align-items-center justify-content-center"
    tabIndex="-1"
    role="dialog"
  >
    <div
      className="modal-dialog modal-dialog-centered h-100"
      style={{ maxWidth: "80%", width: "100%", maxHeight: "70vh" }}
    >
      <div className="modal-content h-100" style={{ backgroundColor: "#f2e8cf" }}>
        <div className="modal-header">
          <h5
            className="modal-title"
            style={{ fontWeight: "bold", textTransform: "uppercase", color: "#333" }}
          >
            {t("Add Course Details")}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label={t("Close")}
          ></button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="level" className="form-label">
                  {t("Course Level")}
                </label>
                <select
                  id="level"
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  className={`form-control ${errors.level ? "is-invalid" : ""}`}
                  required
                >
                  <option value="">{t("Select Level")}</option>
                  <option value="beginner">{t("Beginner")}</option>
                  <option value="advanced">{t("Advanced")}</option>
                  <option value="middle">{t("Middle")}</option>
                </select>
                {errors.level && <div className="invalid-feedback">{errors.level}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  {t("Course Duration (in hours)")}
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  className={`form-control ${errors.duration ? "is-invalid" : ""}`}
                  required
                />
                {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="language" className="form-label">
                  {t("Course Language")}
                </label>
                <select
                  id="language"
                  name="language"
                  value={course.language}
                  onChange={handleChange}
                  className={`form-control ${errors.language ? "is-invalid" : ""}`}
                  required
                >
                  <option value="">{t("Select Language")}</option>
                  <option value="english">{t("English")}</option>
                  <option value="french">{t("French")}</option>
                  <option value="german">{t("German")}</option>
                  <option value="arabic">{t("Arabic")}</option>
                </select>
                {errors.language && <div className="invalid-feedback">{errors.language}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="syllabus" className="form-label">
                  {t("Course Content")}
                </label>
                <textarea
                  id="syllabus"
                  name="syllabus"
                  value={course.syllabus}
                  onChange={handleChange}
                  className={`form-control ${errors.syllabus ? "is-invalid" : ""}`}
                  rows="5"
                  placeholder={t("Enter the course content")}
                  required
                ></textarea>
                {errors.syllabus && <div className="invalid-feedback">{errors.syllabus}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="requirements" className="form-label">
                  {t("Course Requirements")}
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={course.requirements}
                  onChange={handleChange}
                  className={`form-control ${errors.requirements ? "is-invalid" : ""}`}
                  rows="5"
                  placeholder={t("Enter the course requirements")}
                  required
                ></textarea>
                {errors.requirements && <div className="invalid-feedback">{errors.requirements}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {t("Close")}
          </button>
          <button type="button" className="btn btn-primary" onClick={handlePDF}>
          {t('next_button')}

          </button>
        </div>
      </div>
    </div>
  </div>
)}

{PDF && (
      <div
        className="modal fade show d-flex align-items-center justify-content-center"
        tabIndex="-1"
        role="dialog"
        style={{ display: 'block' }}
      >
        <div
          className="modal-dialog modal-dialog-centered h-100"
          style={{ maxWidth: '80%', width: '100%', maxHeight: '70vh' }}
        >
          <div className="modal-content h-100" style={{ backgroundColor: '#f2e8cf' }}>
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: '#333',
                }}
              >
                {t('step3_title')}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="pdfOne" className="form-label">
                  {t('pdfOne_label')}
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  id="pdfOne"
                  name="pdfOne"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPdfOne(file);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    if (pdfOne) {
                      setPdfOnePreview(URL.createObjectURL(pdfOne));
                    }
                  }}
                >
                  {t('preview_pdfOne')}
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => setPdfOnePreview(null)}
                >
                  {t('close_preview')}
                </button>
                {pdfOnePreview && (
                  <div className="mt-2">
                    <h6>{t('preview_pdfOne_label')}</h6>
                    <iframe
                      src={pdfOnePreview}
                      title="PDF One Preview"
                      width="100%"
                      height="400px"
                      style={{ border: '1px solid #ccc' }}
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="pdfTwo" className="form-label">
                  {t('pdfTwo_label')}
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  id="pdfTwo"
                  name="pdfTwo"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPdfTwo(file);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    if (pdfTwo) {
                      setPdfTwoPreview(URL.createObjectURL(pdfTwo));
                    }
                  }}
                >
                  {t('preview_pdfTwo')}
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => setPdfTwoPreview(null)}
                >
                  {t('close_preview')}
                </button>
                {pdfTwoPreview && (
                  <div className="mt-2">
                    <h6>{t('preview_pdfTwo_label')}</h6>
                    <iframe
                      src={pdfTwoPreview}
                      title="PDF Two Preview"
                      width="100%"
                      height="400px"
                      style={{ border: '1px solid #ccc' }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                {t('close_modal')}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
            {t("Save Course")}
            </button>
            </div>
          </div>
        </div>
      </div>
    )}





    </div>
  );
}
