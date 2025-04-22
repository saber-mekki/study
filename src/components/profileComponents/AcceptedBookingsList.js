import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function AcceptedBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tutorsDetails, setTutorsDetails] = useState({});
    const [tutorDetails, setTutorDetails] = useState(false)
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const handleOpenTutorDetails = () => {
        setTutorDetails(true)

    }
    const handleClose = () => {
        setTutorDetails(false);
    };
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.user_id) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/bookings/student/${decoded.user_id}`)
                    .then(res => {
                        const accepted = res.data.filter(b => b.status === "accepted");
                        setBookings(accepted);
                    })
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false));
            }
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
                const users = response.data.result;
                const onlyTutors = users.filter(user => user.type_register === "tutor");
                onlyTutors.forEach((tuto) => {
                    bookings.forEach((book) => {
                        if (book.tutor_id === tuto.user_id) {
                            setTutorsDetails(tuto)
                        }
                    })

                })
            } catch (err) {
                alert("Error fetching users: " + err.message);
            }
        };

        fetchUsers();
    }, [bookings]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (tutorsDetails.user_id) {
                    await axios
                        .get(`${process.env.REACT_APP_API_BASE_URL}/images/${tutorsDetails.user_id}`)
                        .then((response) => {
                            setImageUrl(response.data[response.data.length - 1].image_url)
                        })
                        .catch((error) => {
                            console.error("Error fetching images:", error);
                        });
                }

            } catch (err) {
                if (err.response && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError("An error occurred while fetching user data.");
                }
            }
        };

        fetchUserData();
    }, [tutorsDetails]);

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Accepted Courses</h3>
            {loading ? (
                <p>Loading...</p>
            ) : bookings.length > 0 ? (
                <div className="list-group">
                    {bookings.map((booking, i) => {
                        const bookingDate = new Date(booking.booking_date).toISOString().split("T")[0];
                        const isToday = bookingDate === today;

                        return (
                            <div key={i} className="list-group-item">
                                <h5 className="mb-1">Course with :  <div className="btn btn-outline-primary btn-sm" onClick={handleOpenTutorDetails} > {tutorsDetails.user_name}</div></h5>
                                <p className="mb-1">Date: {new Date(booking.booking_date).toLocaleString()}</p>
                                <div className="d-flex justify-content-between">
                                    {isToday ? (
                                        <a href={`/room/${booking.room_id}`} className="btn btn-success btn-sm">
                                            Enter Room
                                        </a>
                                    ) : (
                                        <a href={`/course/${booking.id}`} className="btn btn-outline-primary btn-sm">
                                            View Details
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-muted">No accepted courses found.</p>
            )}

            {tutorDetails && (
                <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1" role="dialog" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="modal-dialog modal-xl	 modal-dialog-centered" role="document">
                        <div className="modal-content rounded-4 shadow-lg">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">{tutorsDetails.user_name}'s Profile</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={handleClose}
                                ></button>
                            </div>
                            <div className="d-flex flex-row gap-4 align-items-start">



                                <div className="modal-body p-4 my-5 d-flex gap-4">
                                    <div className="row  g-4">
                                        <div className="col-md-4 text-center">
                                            {error ? <div className="text-danger">{error}</div> : <img
                                                src={imageUrl || "/assets/images/tutorprofil.png"}
                                                alt={tutorsDetails.user_name}
                                                className="rounded-circle shadow"
                                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                            />}
                                            <h5 className="mt-3 fw-bold">{tutorsDetails.user_name}</h5>
                                            <p className="text-muted">{tutorsDetails.specialty}</p>
                                            <p><i className="fas fa-map-marker-alt text-danger me-1" />{tutorsDetails.country}</p>
                                        </div>

                                        <div className="col-md-8  p-2">
                                            <p className="text-muted"><strong>Bio:</strong> {tutorsDetails.bio}</p>
                                            <p className="text-muted"><strong>Languages:</strong> {tutorsDetails.languages?.join(', ') || 'Not specified'}</p>
                                            <p className="text-muted"><strong>Rating:</strong> <i className="fas fa-star text-warning" /> {tutorsDetails.rating}</p>
                                            <p className="text-muted"><strong>Price:</strong> <span className="text-success">${tutorsDetails.price} / session</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer bg-light">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
