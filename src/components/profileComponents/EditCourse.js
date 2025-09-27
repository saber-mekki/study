import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useParams, Link } from "react-router-dom";
//import { useCart } from "./context/CartContext";
import SectionTwo from "../layouts/SectionTwo";
import "./AddCourse.css";     //  <-- custom responsive tweaks

export default function EditCourse({ email }) {
  const { t } = useTranslation();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
const [newVideo, setNewVideo] = useState({ file: null, description: "" });
  const [newPDF, setNewPDF] = useState({ file: null, description: "", previewURL: "" });
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState(false);
  const [PDF, setPDF] = useState(false);
  const [laoding, setLaoding] = useState(false);
 // const { addToCart } = useCart();

  // const handleAddToCart = () => {
  //   addToCart({
  //     id: course.id,
  //     title: course.title,
  //     price: course.price,
  //     image: course.imageUrl
  //   });
    
  // };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/${id}`
        );
        const data = res.data;

        const syllabusArray = Array.isArray(data.syllabus)
          ? data.syllabus
          : data.syllabus
            ? data.syllabus.split(/[,.\n]/).map((s) => s.trim()).filter(Boolean)
            : [];

        const requirementsArray = Array.isArray(data.requirements)
          ? data.requirements
          : data.requirements
            ? data.requirements.split(/[,.\n]/).map((r) => r.trim()).filter(Boolean)
            : [];

        setCourse({ ...data, syllabus: syllabusArray, requirements: requirementsArray });

      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [id]);
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/${id}/related`
        );
        setRelatedCourses(res.data.relatedCourses.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Error fetching related courses:", err);
      }
    };
console.log({course})
    if (course?.category) {
      fetchRelated();
    }
  }, [id, course?.category]);
  if (!course) {
    return (
      <SectionTwo title={"Loading..."}>
        <div className="container">
          <p>{t("Loading course details")}...</p>
        </div>
      </SectionTwo>
    );
  }
  // const [course, setCourse] = useState({
  //   title: "",
  //   category: "",
  //   description: "",
  //   price: "",
  //   isFree: false,
  //   image: null,
  //   level: "",
  //   duration: "",
  //   language: "",
  //   syllabus: "",
  //   requirements: "",
  //   videos: [],
  //   pdfs: [],
  // });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
        console.log({c:course})
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDetails = (e) => {
    e.preventDefault();
    console.log({c:course})
    const validationErrors = {};
    if (!course.title) validationErrors.title = t("titleRequired");
    if (!course.category) validationErrors.category = t("categoryRequired");
    if (!course.price && !course.isFree) validationErrors.price = t("priceRequired");
    if (!course.description) validationErrors.description = t("descriptionRequired");
    if (!course.image) validationErrors.image = t("imageRequired");
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);
    setDetails(true);
  };

  const handlePDF = () => {
    const validationErrors = {};
    if (!course.level) validationErrors.level = t("levelRequired");
    if (!course.duration) validationErrors.duration = t("durationRequired");
    if (!course.language) validationErrors.language = t("languageRequired");
    if (!course.syllabus) validationErrors.syllabus = t("syllabusRequired");
    if (!course.requirements) validationErrors.requirements = t("requirementsRequired");
    if (Object.keys(validationErrors).length) {
      return setErrors(validationErrors);
    }
    else {
      setPDF(true);
      setDetails(false);
    }

  };

  const onClose = () => {
    setDetails(false);
    setPDF(false);
  };

  const handleAddVideo = () => {
    if (newVideo.file && newVideo.description) {
      setCourse((p) => ({ ...p, videos: [...p.videos, newVideo] }));
      setNewVideo({ file: null, description: "" });
    }
  };

  const handleDeleteVideo = (i) => {
    setCourse((p) => ({ ...p, videos: p.videos.filter((_, idx) => idx !== i) }));
  };

  const handleAddPDF = () => {
    if (newPDF.file && newPDF.description) {
      setCourse((p) => ({ ...p, pdfs: [...p.pdfs, newPDF] }));
      setNewPDF({ file: null, description: "", previewURL: "" });
    }
  };

  const handleDeletePDF = (i) => {
    setCourse((p) => ({ ...p, pdfs: p.pdfs.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true)
    try {
      const formData = new FormData();
      const Myid = uuidv4();
      Object.entries({
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
        tutor_id: user.idUser,
      }).forEach(([k, v]) => formData.append(k, v));

      course.videos.forEach((v, i) => {
        formData.append(`videos[${i}][file]`, v.file);
        formData.append(`videos[${i}][description]`, v.description);
      });
      course.pdfs.forEach((p, i) => {
        formData.append(`pdfs[${i}][file]`, p.file);
        formData.append(`pdfs[${i}][description]`, p.description);
      });

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/CreateCourse`, formData);
      setLaoding(false)
      history.push("/courses");
    } catch (err) {
      console.error("Error creating course:", err);
      setLaoding(false)
    }
  };

  return (
    <div className="container py-3 add-course-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="text-center mb-3">{t("edit_new_course")}</h2>

          <div className="card p-3 shadow-sm">
            <h3 className="text-center mb-4">{t("course")}</h3>
            <form>
              {/* Title / Category / Price */}
              <div className="row mb-3">
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">{t("Course Title")}</label>
                  <input
                    type="text"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">{t("Category")}</label>
                  <select
                    name="category"
                    value={course.category}
                    onChange={handleChange}
                    className={`form-control ${errors.category ? "is-invalid" : ""}`}
                  >
                    <option value="">{t("Select a Category")}</option>
                    <option value="Development">{t("Development")}</option>
                    <option value="Design">{t("Design")}</option>
                    <option value="Marketing">{t("Marketing")}</option>
                    <option value="Lifestyle">{t("Lifestyle")}</option>
                    <option value="IT & Software">{t("IT & Software")}</option>
                    <option value="Personal">{t("Personal")}</option>
                    <option value="Business">{t("Business")}</option>
                    <option value="Music">{t("Music")}</option>
                  </select>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>

                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label d-block">{t("Price")}</label>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={course.isFree === true}
                      onChange={() => setCourse({ ...course, isFree: true, price: 0 })}
                    />
                    <label className="form-check-label">{t("Free")}</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={course.isFree === false}
                      onChange={() => setCourse({ ...course, isFree: false })}
                    />
                    <label className="form-check-label">{t("Custom price")}</label>
                  </div>

                  {!course.isFree && (
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={course.price}
                      onChange={handleChange}
                      className={`form-control mt-2 ${errors.price ? "is-invalid" : ""}`}
                    />
                  )}
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">{t("Course Description")}</label>
                <textarea
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  rows="3"
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">{t("Course Image")}</label>
                  <img
            className="card-img-top"
            src={course.image ? course.image :  process.env.PUBLIC_URL + "/assets/images/course-single.jpg"}
            style={{ width: "350px", height: "200px" }}
            alt="Course preview"
          />
                <input
                  type="file"
                  onChange={(e) => setCourse({ ...course, image: e.target.files[0] })}
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
              // value={course?.image?}
             />
              
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>

              <button type="button" className="btn btn-primary w-100" onClick={handleDetails}>
                {t("Next")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- Second Step Modal --- */}
      {details && (
        <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-uppercase">{t("Add Course Details")}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">{t("Course Level")}</label>
                    <select
                      name="level"
                      value={course.level}
                      onChange={handleChange}
                      className={`form-control ${errors.level ? "is-invalid" : ""}`}
                    >
                      <option value="">{t("Select Level")}</option>
                      <option value="beginner">{t("Beginner")}</option>
                      <option value="advanced">{t("Advanced")}</option>
                      <option value="middle">{t("Middle")}</option>
                    </select>
                    {errors.level && <div className="invalid-feedback">{errors.level}</div>}
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">{t("Course Duration (in hours)")}</label>
                    <input
                      type="number"
                      name="duration"
                      value={course.duration}
                      onChange={handleChange}
                      className={`form-control ${errors.duration ? "is-invalid" : ""}`}
                    />
                    {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">{t("Course Language")}</label>
                    <select
                      name="language"
                      value={course.language}
                      onChange={handleChange}
                      className={`form-control ${errors.language ? "is-invalid" : ""}`}
                    >
                      <option value="">{t("Select Language")}</option>
                      <option value="english">{t("English")}</option>
                      <option value="french">{t("French")}</option>
                      <option value="german">{t("German")}</option>
                      <option value="arabic">{t("Arabic")}</option>
                    </select>
                    {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">{t("Course Content")}</label>
                    <textarea
                      name="syllabus"
                      value={course.syllabus}
                      onChange={handleChange}
                      className={`form-control ${errors.syllabus ? "is-invalid" : ""}`}
                      rows="4"
                    />
                    {errors.syllabus && <div className="invalid-feedback">{errors.syllabus}</div>}
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">{t("Course Requirements")}</label>
                    <textarea
                      name="requirements"
                      value={course.requirements}
                      onChange={handleChange}
                      className={`form-control ${errors.requirements ? "is-invalid" : ""}`}
                      rows="4"
                    />
                    {errors.requirements && <div className="invalid-feedback">{errors.requirements}</div>}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>{t("Close")}</button>
                <button className="btn btn-primary" onClick={handlePDF}>{t("next_button")}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Third Step Modal (Videos/PDFs) --- */}
      {PDF && (
        <div className="modal fade show d-flex align-items-center justify-content-center" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-uppercase">{t("step3_title")}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                {/* Videos */}
                <h5 className="fw-bold">{t("Add Videos")}</h5>
                <input
                  type="file"
                  accept="video/*"
                  className="form-control mb-2"
                  onChange={(e) => setNewVideo((p) => ({ ...p, file: e.target.files[0] }))}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder={t("Video Description")}
                  value={newVideo.description}
                  onChange={(e) => setNewVideo((p) => ({ ...p, description: e.target.value }))}
                />
                <button className="btn btn-success mb-3" onClick={handleAddVideo}>
                  {t("Add Video")}
                </button>

                <ul className="list-unstyled">
                  {course.videos.map((v, i) => (
                    <li key={i} className="mb-2 border p-2 rounded">
                      <strong>{t("File")}:</strong> {v.file?.name}<br />
                      <strong>{t("Description")}:</strong> {v.description}<br />
                      <button
                        className="btn btn-sm btn-outline-info me-2"
                        onClick={() => window.open(URL.createObjectURL(v.file), "_blank")}
                      >{t("View")}</button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteVideo(i)}
                      >{t("Delete")}</button>
                    </li>
                  ))}
                </ul>

                {/* PDFs */}
                <h5 className="fw-bold mt-4">{t("Add PDFs")}</h5>
                <input
                  type="file"
                  accept="application/pdf"
                  className="form-control mb-2"
                  value={[...course.pdfs]}
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) setNewPDF({ ...newPDF, file: f, previewURL: URL.createObjectURL(f) });
                  }}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder={t("PDF Description")}
                  value={newPDF.description}
                  onChange={(e) => setNewPDF({ ...newPDF, description: e.target.value })}
                />
                <button className="btn btn-outline-primary mb-3" onClick={handleAddPDF}>
                  {t("Add PDF")}
                </button>

                {newPDF.previewURL && (
                  <div className="pdf-preview mb-3">
                    <iframe src={newPDF.previewURL} title="PDF Preview" />
                  </div>
                )}

                <ul className="list-unstyled">
                  {course.pdfs.map((p, i) => (
                    <li key={i} className="mb-2 border p-2 rounded">
                      <strong>{t("File")}:</strong> {p.file?.name}<br />
                      <strong>{t("Description")}:</strong> {p.description}<br />
                      <button
                        className="btn btn-sm btn-outline-info me-2"
                        onClick={() => window.open(URL.createObjectURL(p.file), "_blank")}
                      >{t("View")}</button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeletePDF(i)}
                      >{t("Delete")}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>{t("close_modal")}</button>
                <button className="btn btn-primary" disabled={laoding} onClick={handleSubmit}>{t("Save Course")}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
