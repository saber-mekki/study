import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Inside your AddCourse component, after successful course creation:


export default function AddCourse() {
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

  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState(false);

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

  // Open second modal only if the first modal is fully filled
  const handleDetails = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!course.title) validationErrors.title = "Course title is required.";
    if (!course.category) validationErrors.category = "Category is required.";
    if (!course.price) validationErrors.price = "Price is required.";
    if (!course.description) validationErrors.description = "Course description is required.";
    if (!course.image) validationErrors.image = "Course image is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setDetails(true);
  };

  const onClose = () => {
    setDetails(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!course.level) validationErrors.level = "Course level is required.";
    if (!course.duration) validationErrors.duration = "Course duration is required.";
    if (!course.language) validationErrors.language = "Course language is required.";
    if (!course.syllabus) validationErrors.syllabus = "Course content is required.";
    if (!course.requirements) validationErrors.requirements = "Course requirements are required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/v1/CreateCourse", {
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
      });

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
          <h2 className="card-title text-center mb-3">Add a New Course</h2>
          <div className="card p-3 shadow">
            <h2 className="card-title text-center mb-3">Course</h2>
            <form>
              <div className="row mb-2">
                <div className="col-md-4">
                  <label htmlFor="title" className="form-label">
                    Course Title
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
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={course.category}
                    onChange={handleChange}
                    className={`form-control ${errors.category ? "is-invalid" : ""}`}
                    required
                  >
                    <option value="">Select a Category</option>
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
                    Price ($)
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
                  Course Description
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
                  Course Image
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
                onClick={handleDetails} // This now triggers the validation before opening the second modal
                className="btn btn-primary w-100"
              >
                Next              </button>

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
                  Add Course Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="level" className="form-label">
                        Course Level
                      </label>
                      <select
                        id="level"
                        name="level"
                        value={course.level}
                        onChange={handleChange}
                        className={`form-control ${errors.level ? "is-invalid" : ""}`}
                        required
                      >
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="advanced">Advanced</option>
                        <option value="middle">Middle</option>
                      </select>
                      {errors.level && <div className="invalid-feedback">{errors.level}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="duration" className="form-label">
                        Course Duration (in hours)
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
                        Course Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={course.language}
                        onChange={handleChange}
                        className={`form-control ${errors.language ? "is-invalid" : ""}`}
                        required
                      >
                        <option value="">Select Language</option>
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="arabic">Arabic</option>
                      </select>
                      {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="syllabus" className="form-label">
                        Course Content
                      </label>
                      <textarea
                        id="syllabus"
                        name="syllabus"
                        value={course.syllabus}
                        onChange={handleChange}
                        className={`form-control ${errors.syllabus ? "is-invalid" : ""}`}
                        rows="5"
                        placeholder="Enter the course content"
                        required
                      ></textarea>
                      {errors.syllabus && <div className="invalid-feedback">{errors.syllabus}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="requirements" className="form-label">
                        Course Requirements
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={course.requirements}
                        onChange={handleChange}
                        className={`form-control ${errors.requirements ? "is-invalid" : ""}`}
                        rows="5"
                        placeholder="Enter the course requirements"
                        required
                      ></textarea>
                      {errors.requirements && <div className="invalid-feedback">{errors.requirements}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Save Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
