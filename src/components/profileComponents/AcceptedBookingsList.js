import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BookingCountdown } from "./BookingCountdown";

export function AcceptedBookingsList() {
    const role = localStorage.getItem("role");

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isCourseDetailsOpen, setIsCourseDetailsOpen] = useState(false);

    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(true);
    const [usersDetails, setUsersDetails] = useState({});
    const [tutorDetailsIsOpen, setTutorDetailsIsOpen] = useState(false)
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 3;

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const history = useHistory();

    const handleOpenCourseDetails = (booking) => {

        setSelectedCourse(booking);
        setIsCourseDetailsOpen(true);
    }

    const handleCloseCourseDetails = () => {
        setIsCourseDetailsOpen(false);
        setSelectedCourse(null);
    };

    const canStartLiveSession = (bookingDate) => {
        const now = new Date();
        const startDate = new Date(bookingDate);

        const isSameDay = now.toDateString() === startDate.toDateString();
        const diffInMs = startDate - now;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        return isSameDay && diffInHours <= 1 && diffInMs > 0;
    };

    const handleOpenTutorDetailsIsOpen = (user) => {
        setTutorDetailsIsOpen(true)
        if (user !== undefined) {
            setUsersDetails(user)
        }

    }
    const handleClose = () => {
        setTutorDetailsIsOpen(false);
    };

    const startLiveSession = async (bookingId, roomId) => {

        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/booking/update`, {
                bookingId,
                liveLink: roomId
            })

        } catch (error) {
            console.error("Erreur lors de la mise à jour du lien live :", error);
        }
    };

    const handleDelete = async (bookingId) => {
        const confirmed = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmed) return;
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tutor/booking-requests/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId }),
            });

            if (!res.ok) throw new Error("Failed to delete booking");


            alert("Booking deleted successfully");
            setIsDeleted(!isDeleted)
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete booking");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.user_id) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/bookings/student/${decoded.user_id}?itsTutor=${role === "tutor"}`)
                    .then(res => {

                        const accepted = res.data.filter(b => b.status === "accepted");
                        setBookings(accepted);
                    })
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false));
            }
        }
    }, [role, isDeleted]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
                const users = response.data.result;

                // const onlyTutors = users.filter(user => user.type_register === "tutor");
                users.forEach((user) => {
                    bookings.forEach((book) => {

                        setUsers(users)
                        if (role === "tutor" && book.tutor_id === user.user_id) {
                            setUsersDetails(user)

                        }

                        if (role !== "tutor" && book.user_id === user.user_id) {
                            setUsersDetails(user)
                        }
                    })
                })



            } catch (err) {
                alert("Error fetching users: " + err.message);
            }
        };

        fetchUsers();
    }, [bookings, role]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (usersDetails.user_id) {
                    await axios
                        .get(`${process.env.REACT_APP_API_BASE_URL}/images/${usersDetails.user_id}`)
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
    }, [usersDetails]);

    const today = new Date();

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Accepted Meetings</h3>
            {loading ? (
                <p>Loading...</p>
            ) : bookings.length > 0 ? (
                <div className="list-group">
                    {currentBookings.map((booking, i) => {
                        const bookingDate = new Date(booking.booking_date);
                        const isPast = bookingDate < today;
                        const bookingsForTutor = users.filter(user => booking.tutor_id === user.user_id);
                        const bookingsForUser = users.filter(user => booking.user_id === user.user_id);
                        const usersDetails = role === "tutor" ? bookingsForUser[0] : bookingsForTutor[0]

                        return (
                            <div key={i} className="list-group-item">
                                <h5 className="mb-1">Meeting  with :  <div className="btn btn-outline-primary btn-sm" onClick={() => handleOpenTutorDetailsIsOpen(usersDetails)} >{role === "tutor" ? booking.name : bookingsForTutor[0] !== undefined ? bookingsForTutor[0].user_name : ""}</div></h5>
                                <p className="mb-1">Date: {new Date(booking.booking_date).toLocaleString()}</p>
                                <BookingCountdown bookingDate={booking.booking_date} />
                                <div className="d-flex justify-content-between">
                                    {role !== "tutor" && booking.live_link !== "" && booking.live_link !== null && (
                                        <Link to={`/room/${booking.live_link}`} className="btn btn-success btn-sm">
                                            Enter Room
                                        </Link>)}
                                    {role === "tutor" && (
                                        isPast ? (
                                            <button className="btn btn-secondary btn-sm" disabled>
                                                Session expirée
                                            </button>
                                        ) : canStartLiveSession(booking.booking_date) ? (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    const roomId = `live-${Date.now()}-${booking.id}`;
                                                    startLiveSession(booking.id, roomId);
                                                    history.push(`/room/${roomId}`);
                                                }}
                                            >
                                                Démarrer une session live
                                            </button>
                                        ) : <button className="btn btn-secondary" disabled>
                                            La session live pas encore disponible
                                        </button>
                                    )}

                                    {role === "tutor" && <button onClick={() => handleDelete(booking.id)} style={{ color: "white", background: "red", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                        Delete Booking
                                    </button>}
                                    <button
                                        onClick={() => handleOpenCourseDetails(booking)}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        View Details
                                    </button>

                                </div>
                            </div>
                        );
                    })}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button onClick={() => setCurrentPage((p) => (indexOfLastBooking < bookings.length ? p + 1 : p))}
                            disabled={indexOfLastBooking >= bookings.length}>
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-muted">No accepted courses found.</p>
            )}

            {tutorDetailsIsOpen && (
                <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1" role="dialog" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <div className="modal-dialog modal-xl	 modal-dialog-centered" role="document">
                        <div className="modal-content rounded-4 shadow-lg">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">{usersDetails.user_name}'s Profile</h5>
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
                                            {error ? <div className="text-danger">{error}</div> : <Link to={`/user/${usersDetails.user_id}`}>
                                                <img
                                                    src={imageUrl || "/assets/images/tutorprofil.png"}
                                                    alt={usersDetails.user_name}
                                                    className="rounded-circle shadow"
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover', cursor: 'pointer' }}
                                                />
                                            </Link>}
                                            <Link to={`/user/${usersDetails.user_id}`}>  <h5 className="mt-3 fw-bold">{usersDetails.user_name}</h5></Link>
                                            <p className="text-muted">{usersDetails.specialty}</p>
                                            <p><i className="fas fa-map-marker-alt text-danger me-1" />{usersDetails.country}</p>
                                        </div>

                                        <div className="col-md-8  p-2">
                                            <p className="text-muted"><strong>Bio:</strong> {usersDetails.bio}</p>
                                            <p className="text-muted"><strong>Languages:</strong> {usersDetails.languages?.join(', ') || 'Not specified'}</p>
                                            <p className="text-muted"><strong>Rating:</strong> <i className="fas fa-star text-warning" /> {usersDetails.rating}</p>
                                            <p className="text-muted"><strong>Price:</strong> <span className="text-success">${usersDetails.price} / session</span></p>
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
            {isCourseDetailsOpen && selectedCourse && (
                <div className="modal fade show d-flex align-items-center justify-content-center"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content rounded-4 shadow-lg">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Meeting Details  </h5>

                                <button type="button" className="btn-close" onClick={handleCloseCourseDetails}></button>
                            </div>
                            <div className="modal-body">
                                <h5> <BookingCountdown bookingDate={selectedCourse.booking_date} /></h5>
                                <p><strong>Date:</strong> {new Date(selectedCourse.booking_date).toLocaleString()}</p>
                                <p><strong>Status:</strong> {selectedCourse.status}</p>
                                <p><strong>Live Link:</strong> {selectedCourse.live_link || "Not available"}</p>
                                <p><strong>Student:</strong> {selectedCourse.name}</p>
                                <p><strong>Message:</strong> {selectedCourse.message}</p>
                                {!canStartLiveSession(selectedCourse.booking_date) && (
                                    <p className="text-sm text-red-600 mt-2">
                                        Vous pouvez démarrer la session uniquement 1h avant l'heure prévue le jour du rendez-vous.
                                    </p>
                                )}

                                {/* Ajoute d'autres champs ici */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseCourseDetails}>
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
