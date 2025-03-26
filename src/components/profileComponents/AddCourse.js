import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/courseSlice";
import CourseCard from "../layouts/CourseCard";

export default function AddCourse() {
  const dispatch = useDispatch();
  const [course, setCourse] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addCourse(course));
    setShowModal(false);
    setCourse({ title: "", category: "", description: "", price: "", image: null });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-3 shadow">
            <h2 className="card-title text-center mb-3">Add a New Course</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-md-4">
                  <label htmlFor="title" className="form-label">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={course.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={course.category}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="price" className="form-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={course.price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="description" className="form-label">Course Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={course.description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="image" className="form-label">Course Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Add Course</button>
              <button onClick={handlePreview} className="btn btn-success w-100">Preview Your Card</button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <CourseCard title={course.title} price={course.price} description={course.description} imageUrl={course.image} />
            <div className="mt-3 d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
