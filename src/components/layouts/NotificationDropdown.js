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
                    let targetUrl = "#";

                    if (note.type === "booking_accepted") {
                        targetUrl = `#/profile/bookings`;
                    } else if (note.type === "message") {
                        targetUrl = `/messages/${note.reference_id}`;
                    } else if (note.type === "profile") {
                        targetUrl = `/profile`;
                    }

                    return (
                        <li key={index} onClick={handleDropdownOpen} className={`dropdown-item notif-item ${note.is_read ? '' : 'unread'}`}>
                            <a href={targetUrl} className="notif-link">
                                <div className="notif-message">{note.message}</div>
                                <div className="notif-date text-muted">
                                    <i className="far fa-clock me-1" />
                                    {new Date(note.created_at).toLocaleString()}
                                </div>
                            </a>
                        </li>
                    );
                })}

            </ul>
        </li>
    );
}
