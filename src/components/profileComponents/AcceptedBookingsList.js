import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function AcceptedBookingsList() {
    const role = localStorage.getItem("role");

    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usersDetails, setUsersDetails] = useState({});
    const [tutorDetailsIsOpen, setTutorDetailsIsOpen] = useState(false)
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const history = useHistory();

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
    }, [role]);

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

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Accepted Meetings</h3>
            {loading ? (
                <p>Loading...</p>
            ) : bookings.length > 0 ? (
                <div className="list-group">
                    {bookings.map((booking, i) => {
                        const bookingDate = new Date(booking.booking_date).toISOString().split("T")[0];
                        const isToday = bookingDate === today;
                        const bookingsForTutor = users.filter(user => booking.tutor_id === user.user_id);
                        const bookingsForUser = users.filter(user => booking.user_id === user.user_id);
                        const usersDetails = role === "tutor" ? bookingsForUser[0] : bookingsForTutor[0]
                        return (
                            <div key={i} className="list-group-item">
                                <h5 className="mb-1">Meeting  with Mr:  <div className="btn btn-outline-primary btn-sm" onClick={() => handleOpenTutorDetailsIsOpen(usersDetails)} >{role === "tutor" ? booking.name : bookingsForTutor[0] !== undefined ? bookingsForTutor[0].user_name : ""}</div></h5>
                                <p className="mb-1">Date: {new Date(booking.booking_date).toLocaleString()}</p>
                                <div className="d-flex justify-content-between">
                                    {role !== "tutor" && booking.live_link !== "" && booking.live_link !== null && (
                                        <Link to={`/room/${booking.live_link}`} className="btn btn-success btn-sm">
                                            Enter Room
                                        </Link>)}
                                    {role === "tutor" && (<button
                                        onClick={() => {
                                            const roomId = `live-${Date.now()}-${booking.id}`;
                                            startLiveSession(booking.id, roomId)
                                            history.push(`/room/${roomId}`);
                                        }}
                                    >
                                        Démarrer une session live
                                    </button>
                                    )}
                                    <a href={`/course/${booking.id}`} className="btn btn-outline-primary btn-sm">
                                        View Details
                                    </a>

                                </div>
                            </div>
                        );
                    })}
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
                                            {error ? <div className="text-danger">{error}</div> : <img
                                                src={imageUrl || "/assets/images/tutorprofil.png"}
                                                alt={usersDetails.user_name}
                                                className="rounded-circle shadow"
                                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                            />}
                                            <h5 className="mt-3 fw-bold">{usersDetails.user_name}</h5>
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

        </div>
    );
}
