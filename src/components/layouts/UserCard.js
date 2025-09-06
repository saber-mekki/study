import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UserCard({
  id,
  name,
  email,
  role,
  image,
  status,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [tutorPDFs, setTutorPDFs] = useState([]);
  const user = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const fetchTutorPDFs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/tutors/${email}/pdfs`
        );
        setTutorPDFs(res.data);
      } catch (err) {
        console.error("Error fetching tutor PDFs:", err);
      }
    };

    if (role === "tutor" && email) fetchTutorPDFs();
  }, [email, role]);
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/images/${id}`
        );
        const images = response.data;
        if (Array.isArray(images) && images.length > 0) {
          setImageUrl(images[images.length - 1].image_url);
        }
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("Unable to load profile picture.");
      }
    };

    if (id) fetchUserImage();
  }, [id]);

  const handleDeletePDF = async (pdfId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/tutors/pdfs/${pdfId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTutorPDFs(tutorPDFs.filter((pdf) => pdf.id !== pdfId));
      alert("PDF deleted successfully.");
    } catch (err) {
      console.error("Failed to delete PDF:", err);
      alert("Failed to delete PDF. See console for details.");
    }
  };

  const openModal = (action, status = "") => {
    setModalAction(action);
    setSelectedStatus(status);
    setModalTitle(
      action === "makeAdmin"
        ? "Confirm Make Admin"
        : action === "delete"
          ? "Confirm Delete"
          : "Confirm Status Change"
    );
    setDropdownOpen(false);
    setShowModal(true);
    setSecurityCode("");
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const verifyRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/verifyPassword`,
        {
          password: securityCode,
          id: user.idUser
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // optional but recommended
          },
        }
      );
      if (!verifyRes.data.valid) {
        setErrorCode(true);
        return;
      }
      if (modalAction === "makeAdmin") {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/makeItAdmin`, { id });
        alert(`${name} is now an admin`);
      } else if (modalAction === "delete") {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/deleteUser`, { id });
        alert("User deleted successfully");
      } else if (modalAction === "status") {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/status`, {
          id,
          status: selectedStatus,
        });
        alert(`User status updated to "${selectedStatus}"`);
      }
      window.location.reload();
    } catch (err) {
      console.error("Action failed:", err);
      alert("Action failed. See console for error.");
    } finally {
      setShowModal(false);
    }
  };


  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card shadow-sm border-0 rounded-4 p-4 pt-5 position-relative text-center h-100">
          <div className="position-absolute" style={{ top: "10px", right: "10px", zIndex: 10 }}>
            <div className="dropdown">
              <button
                className="btn btn-light btn-sm"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu show shadow" style={{ right: 0, left: "auto", top: "100%" }}>
                  {role !== "admin" && (
                    <>

                      <li>
                        <button className="dropdown-item" onClick={() => openModal("makeAdmin")}>
                          <i className="fas fa-user-shield text-primary me-2"></i> Make Admin
                        </button>
                      </li>

                      <li>
                        <button className="dropdown-item" onClick={() => openModal("status", "accepted")}>
                          <i className="fas fa-check-circle text-success me-2"></i> Accept User
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => openModal("status", "waiting")}>
                          <i className="fas fa-clock text-warning me-2"></i> Set to Waiting
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => openModal("status", "rejected")}>
                          <i className="fas fa-times-circle text-danger me-2"></i> Refuse User
                        </button>
                      </li>

                    </>
                  )}
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => openModal("delete")}>
                      <i className="fas  pr-2 fa-trash-alt me-2"></i>{role === "admin" ? "Delete Admin" : "Delete User"}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center mb-3">
            {error ? (
              <div className="text-danger">{error}</div>
            ) : (
              <img
                src={imageUrl || "/assets/images/tutorprofil.png"}
                alt={`${name} profile`}
                className="rounded-circle shadow"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "4px solid #f0f0f0",
                }}
              />
            )}
          </div>

          <h5 className="text-primary fw-bold mb-1">{name}</h5>

          <div className={role === "admin" ? "text-danger h5" : "h5"}>
            <div><strong>Email:</strong> {email}</div>
            <div>
              <strong>Role:</strong> <span >{role}</span>
            </div>
            {role !== "admin" && (
              <div>
                <strong>Status:</strong> {status}
              </div>
            )}
            {role === "tutor" && (
              <div>
                <strong>Courses Created: 0</strong>
              </div>
            )}
            {role === "student" && (
              <div>
                <strong>Courses Purchased: 0</strong>
              </div>
            )}
            {role === "tutor" && tutorPDFs.length > 0 && (
              <div className="mt-3 text-start">
                <strong>Uploaded Documents:</strong>
                <ul className="list-unstyled mt-1">
                  {tutorPDFs.map((pdf) => (
                    <li key={pdf.id} className="d-flex align-items-center justify-content-between mb-1">
                      <a
                        href={pdf.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {pdf.type || "PDF"} 📄
                      </a>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDeletePDF(pdf.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {role === "tutor" && tutorPDFs.length === 0 && (
              <div className="mt-3 text-muted">
                No documents uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content p-4">
              <div className="modal-body text-center">
                <h5 className="mb-3">{modalTitle}</h5>
                <p className="mb-2">Please enter the security code to proceed:</p>
                <input
                  type="password"
                  className="form-control mb-3"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  placeholder="Enter Your admin code"
                />
                {errorCode && (
                  <div className="text-danger mb-2">
                    Error: Incorrect security code.
                  </div>
                )}
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-primary" onClick={handleConfirm}>
                    Confirm
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
