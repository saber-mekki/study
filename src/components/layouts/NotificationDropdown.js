import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './NotificationsDropdown.css';

export function NotificationsDropdown({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.user_id) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/notifications/${decodedToken.user_id}`)
                    .then(res => {
                        setNotifications(res.data);
                        setUnreadCount(res.data.filter(n => !n.is_read).length);
                    })
                    .catch(err => console.error(err));
            }
        }
    }, [userId]);

    const handleDropdownOpen = async () => {
        const unreadNotifications = notifications.filter(n => !n.is_read);
        await Promise.all(unreadNotifications.map(note =>
            axios.put(`${process.env.REACT_APP_API_BASE_URL}/notifications/${note.id}/read`)
        ));
        const updated = notifications.map(note => ({ ...note, is_read: true }));
        setNotifications(updated);
        setUnreadCount(0);
    };

    return (
        <li className="nav-item dropdown notifications-container">
            <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="notificationDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="fas fa-bell fa-lg position-relative">
                    {unreadCount > 0 && (
                        <span className="notif-badge">
                            {unreadCount}
                        </span>
                    )}
                </i>
            </a>

            <ul className="dropdown-menu dropdown-menu-end notif-dropdown" aria-labelledby="notificationDropdown">
                <li className="dropdown-header fw-bold text-center">Notifications</li>
                {notifications.map((note, index) => {
                    let targetUrl = "/#/profile/calendar";

                    if (note.type === "session_created") {
                        targetUrl = `#/profile/groups`;
                    } else if (note.type === "booking_accepted") {
                        targetUrl = `#/profile/bookings`;
                    } else if (note.type === "message") {
                        targetUrl = `/messages/${note.reference_id}`;
                    } else if (note.type === "profile") {
                        targetUrl = `/profile`;
                    } else if (note.type === "live_started" || note.type === "live_stopped") {
                        targetUrl = `#/profile/bookings`;
                    }

                    const handleDelete = async (e) => {
                        e.stopPropagation(); // prevent triggering dropdown close
                        try {
                            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/notifications/${note.id}`);
                            setNotifications((prev) => prev.filter((n) => n.id !== note.id));
                            setUnreadCount((prev) => note.is_read ? prev : prev - 1);
                        } catch (err) {
                            console.error("Error deleting notification:", err);
                        }
                    };

                    return (
                        <li
                            key={index}
                            className={`dropdown-item notif-item ${note.is_read ? '' : 'unread'}`}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <a href={targetUrl} className="notif-link" onClick={handleDropdownOpen}>
                                    <div className="notif-message">{note.message}</div>
                                    <div className="notif-date text-muted">
                                        <i className="far fa-clock me-1" />
                                        {new Date(note.created_at).toLocaleString()}
                                    </div>
                                </a>
                                <button
                                    className="btn btn-sm btn-link text-danger p-0 ms-2"
                                    onClick={handleDelete}
                                    title="Delete notification"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
}
