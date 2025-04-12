import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RecentTutorSection() {
    const [showTutor, setshowTtor] = useState(false);
    const [tutors, setTutors] = useState([]);
    const [tutor, setTutor] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
                const users = response.data.result;

                const onlyTutors = users.filter(
                    (user) => user.type_register === "tutor"
                );

                const selected = [onlyTutors[0], onlyTutors[1], onlyTutors[3]].filter(
                    Boolean
                );

                setTutors(selected);
            } catch (err) {
                alert("Error fetching users: " + err.message);
            }
        };

        fetchUsers();
    }, []);

    const TutorCard = (tutor) => {
        setshowTtor(true);
        setTutor(tutor);
    };

    const handleModalClose = () => {
        setshowTtor(false);
    };

    return (
        <section className="section-padding">
            <div className="container">
                <div className="row align-items-center mb-30">
                    <div className="col-lg-9 text-center text-lg-left">
                        <h2 className="section-title mb-0">
                            Tutors <span className="has-line">Joined Recently</span>
                        </h2>
                    </div>
                    <div className="col-lg-3 mt-4 mt-lg-0 text-center text-lg-right">
                        <Link
                            to={"/home-one"}
                            className="text-primary font-weight-600 initiate-scripts"
                        >
                            Show More
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {tutors.map((tutor, index) => (
                        <div
                            onClick={() => TutorCard(tutor)}
                            className="col-lg-4 col-md-6"
                            key={index}
                        >
                            <div className="card shadow-sm mt-40">
                                <div className="card-body p-30">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <div className="media d-block">
                                            <img
                                                className="mx-auto mx-sm-0"
                                                src={
                                                    process.env.PUBLIC_URL + "/assets/images/user-01.jpg"
                                                }
                                                alt=""
                                            />
                                            <div className="mt-3">
                                                <h4 className="font-weight-600 text-blue mb-1">
                                                    {tutor.gender === "male" ? "Mr. " : "Ms. "}
                                                    {tutor.user_name}
                                                </h4>
                                                <div>
                                                    <h4>{tutor.name}</h4>
                                                    <div
                                                        style={{
                                                            color: tutor.is_active === true ? "green" : "red",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {tutor.is_active === true
                                                            ? "🟢 Online"
                                                            : "🔴 Offline"}
                                                    </div>
                                                </div>
                                                <p className="h2 text-dark">{tutor.country}</p>
                                            </div>
                                        </div>
                                        <div className="text-primary text-center">
                                            <span className="h2 d-block font-weight-bold line-hight-1">
                                                ${tutor.price_per_hour}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="list-inline my-1 pt-1 pb-4 border-top border-bottom">
                                        {tutor.languages && tutor.languages.length > 0 ? (
                                            tutor.languages.map((language, index) => (
                                                <li
                                                    key={index}
                                                    className="list-inline-item p-2 bg-gray rounded mt-2"
                                                >
                                                    {language}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="list-inline-item p-2 bg-gray rounded mt-2">
                                                No languages specified
                                            </li>
                                        )}
                                    </ul>
                                    <p className="h3 my-3">{tutor.degree}</p>

                                    <Link
                                        to={"/home-one"}
                                        className="btn btn-outline-primary rounded-pill initiate-scripts"
                                    >
                                        Send Message
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showTutor && tutor && (
                <div
                    id="succ"
                    onClick={(e) => e.target.id === "succ" && handleModalClose()}
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content rounded-3 shadow-lg border-0">
                            <div className="modal-body p-4">
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn-close text-dark"
                                        onClick={handleModalClose}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="text-center">
                                    <div className="mb-3">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/images/user-01.jpg'} 
                                            alt="Tutor"
                                            className="rounded-circle img-fluid border border-5 border-success"
                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <h4 className="text-primary fw-bold mb-2">
                                        {tutor.gender === "male" ? "Mr. " : "Ms. "} {tutor.user_name}
                                    </h4>
                                    <p className="text-muted mb-3">{tutor.degree} - {tutor.specialty}</p>
                                    <p className="h6 text-muted mb-4">
                                        <strong>{tutor.country}</strong>
                                    </p>

                                    <div className="list-group mb-4">
                                        <div className="list-group-item d-flex justify-content-between align-items-center">
                                            <strong>Price per Hour:</strong> ${tutor.price_per_hour}
                                        </div>
                                        <div className="list-group-item d-flex justify-content-between align-items-center">
                                            <strong>Languages:</strong> {tutor.languages.join(", ")}
                                        </div>
                                        <div className="list-group-item d-flex justify-content-between align-items-center">
                                            <strong>Availability:</strong> {tutor.availability}
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary rounded-pill initiate-scripts"
                                            onClick={handleModalClose}
                                        >
                                            {"contact " + tutor.user_name}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}

export default RecentTutorSection;
