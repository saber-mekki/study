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
    videos: [],
    pdfs: []
  });

  const [newVideo, setNewVideo] = useState({ url: "", description: "" });
  const [newPDF, setNewPDF] = useState({ file: null, description: "" });
  const [PDF, setPDF] = useState(false);

  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState(false);

  const handleAddPDF = () => {

    if (newPDF.file && newPDF.description) {
      setCourse(prev => ({
        ...prev,
        pdfs: [...prev.pdfs, newPDF]
      }));
      setNewPDF({ file: null, description: "" });
    }
  };

  const handlePDF = (e) => {
    setPDF(true)
    setDetails(false)

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };


  const handleDetails = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!course.title) validationErrors.title = t("titleRequired");
    if (!course.category) validationErrors.category = t("categoryRequired");
    if (!course.price && !course.isFree) validationErrors.price = t("priceRequired");
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

  const handleDeletePDF = (index) => {
    const updatedPDFs = [...course.pdfs];
    updatedPDFs.splice(index, 1);
    setCourse({ ...course, pdfs: updatedPDFs });
  };

  const handleAddVideo = (e) => {

    if (newVideo.file) {
      setCourse({
        ...course,
        videos: [...course.videos, newVideo],
      });
      setNewVideo({ file: null, description: "" });
    }
  };

  const handleDeleteVideo = (index) => {
    const updatedVideos = [...course.videos];
    updatedVideos.splice(index, 1);
    setCourse({ ...course, videos: updatedVideos });
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
      const formData = new FormData();
      formData.append("id", Myid);
      formData.append("title", course.title);
      formData.append("category", course.category);
      formData.append("price", course.price);
      formData.append("description", course.description,);
      formData.append("image", course.image);
      formData.append("tutor", user.name);
      formData.append("date", new Date().toISOString().split("T")[0]);
      formData.append("level", course.level);
      formData.append("duration", course.duration);
      formData.append("language", course.language);
      formData.append("syllabus", course.syllabus);
      formData.append("requirements", course.requirements);
      formData.append("tutor_email", email);
      formData.append("tutor_id", user.idUser);

      course.videos.forEach((videoObj, idx) => {
        formData.append(`videos[${idx}][file]`, videoObj.file);
        formData.append(`videos[${idx}][description]`, videoObj.description);
      });


      course.pdfs.forEach((pdfObj, idx) => {
        formData.append(`pdfs[${idx}][file]`, pdfObj.file);
        formData.append(`pdfs[${idx}][description]`, pdfObj.description);
      });

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/CreateCourse`, formData
      );

      setDetails(false);
      history.push("/courses");

    } catch (error) {
      console.error("Error creating course:", error.response || error.message);
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
                  <label className="form-label d-block">{t("Price")}</label>

                  {/* Choix du type de prix */}
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceType"
                      id="freeOption"
                      value="free"
                      checked={course.isFree === true}
                      onChange={() =>
                        setCourse({ ...course, isFree: true, price: 0 })
                      }
                    />
                    <label className="form-check-label" htmlFor="freeOption">
                      {t("Free")}
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceType"
                      id="paidOption"
                      value="paid"
                      checked={course.isFree === false}
                      onChange={() =>
                        setCourse({ ...course, isFree: false })
                      }
                    />
                    <label className="form-check-label" htmlFor="paidOption">
                      {t("Custom price")}
                    </label>
                  </div>

                  {/* Champ de saisie uniquement si "Custom price" est choisi */}
                  {!course.isFree && (
                    <div className="mt-2">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        min="0"
                        step="0.01"
                        value={course.price}
                        onChange={handleChange}
                        className={`form-control ${errors.price ? "is-invalid" : ""}`}
                        required
                      />
                      {errors.price && (
                        <div className="invalid-feedback">{errors.price}</div>
                      )}
                    </div>
                  )}
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
                  onChange={(e) => setCourse({ ...course, image: e.target.files[0] })}
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
                  <div className="mb-3">
                    <h5>{t("Add Videos")}</h5>

                    <div className="mb-3">
                      <label htmlFor="videoFile" className="form-label">{t("Upload Video")}</label>
                      <input
                        type="file"
                        accept="video/*"
                        id="videoFile"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setNewVideo(prev => ({ ...prev, file }));
                          }
                        }}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="videoDescription" className="form-label">{t('Video Description')}</label>
                      <input
                        type="text"
                        id="videoDescription"
                        value={newVideo.description}
                        onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                        className="form-control"
                      />
                    </div>

                    <button type="button" className="btn btn-success" onClick={handleAddVideo}>
                      {t('Add Video')}
                    </button>

                    <ul className="mt-2">
                      {course.videos.map((v, idx) => (
                        <li key={idx} className="mb-2">
                          <strong> {t('File')}:</strong> {v.file?.name} <br />
                          <strong> {t('Description')}:</strong> {v.description} <br />

                          <div className="mt-1">
                            <button
                              className="btn btn-sm btn-outline-info me-2"
                              onClick={() => {
                                const fileURL = typeof v.file === 'string'
                                  ? v.file
                                  : URL.createObjectURL(v.file);
                                window.open(fileURL, "_blank");
                              }}
                            >
                              {t('View')}
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteVideo(idx)}
                            >
                              {t('Delete')}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>


                  <div className="mb-3">
                    <h5>{t("Add PDFs")}</h5>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const previewURL = URL.createObjectURL(file);
                          setNewPDF({ ...newPDF, file, previewURL });
                        }
                      }}
                      className="form-control mb-2"
                    />
                    <textarea
                      placeholder="PDF Description"
                      value={newPDF.description}
                      onChange={(e) => setNewPDF({ ...newPDF, description: e.target.value })}
                      className="form-control mb-2"
                    />
                    <button type="button" className="btn btn-outline-primary" onClick={handleAddPDF}>
                      {t("Add PDF")}
                    </button>

                    {/* PDF Preview */}
                    {newPDF?.previewURL && (
                      <div className="mt-3">
                        <strong>{t("Preview")}:</strong><br />
                        <iframe
                          src={newPDF.previewURL}
                          width="100%"
                          height="500px"
                          title="PDF Preview"
                          style={{ border: "1px solid #ccc" }}
                        />
                      </div>
                    )}

                    {/* Show added PDFs */}
                    {/* Show added PDFs */}
                    <ul className="mt-2">
                      {course.pdfs.map((p, idx) => (
                        <li key={idx} className="mb-2">
                          <strong>File:</strong> {p.file?.name} <br />
                          <strong>Description:</strong> {p.description} <br />

                          {/* Boutons */}
                          <div className="mt-1">
                            {/* View PDF */}
                            <button
                              className="btn btn-sm btn-outline-info me-2"
                              onClick={() => {
                                const fileURL = typeof p.file === 'string'
                                  ? p.file
                                  : URL.createObjectURL(p.file);
                                window.open(fileURL, "_blank");
                              }}
                            >
                              View
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeletePDF(idx)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                  </div>

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
