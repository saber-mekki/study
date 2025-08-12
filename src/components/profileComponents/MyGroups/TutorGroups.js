import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function TutorGroups() {
    const [groups, setGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const history = useHistory();
    const user = useSelector((state) => state.user);

    const startLiveSession = async (groupId, roomId, startTime, endTime) => {
        try {
            const today = new Date();
            const sessionDate = today.toISOString().split("T")[0];
            const res = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/groups/sessions`,
                {
                    group_id: groupId,
                    session_date: sessionDate,
                    start_time: startTime,
                    end_time: endTime,
                    meeting_link: `/room-meating/${roomId}`,
                    status:'active'
                }
            );
            const id = res.data.id;
            localStorage.setItem("sessionId", id);
           
            history.push(`/room-meating/${roomId}`);

        } catch (error) {
            console.error("Erreur lors de la création de la session :", error);
        }
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${user.idUser}`)
            .then(res => setGroups(res.data))
            .catch(err => console.error(err));
    }, [user]);

    const deleteGroup = async (groupId) => {
        if (!window.confirm("Are you sure you want to delete this group?")) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupId}`);
            setGroups(prevGroups => prevGroups.filter(group => group.group_id !== groupId));
        } catch (error) {
            console.error("Error deleting the group:", error);
        }
    };

    const LiveSchedule = ({ daily_start, daily_end }) => {
        const [timeUntilStart, setTimeUntilStart] = useState("");
        const [duration, setDuration] = useState("");

        useEffect(() => {
            const updateTime = () => {
                const now = new Date();

                // Create today's start and end Date objects
                const startParts = daily_start.split(":");
                const endParts = daily_end.split(":");

                const startDate = new Date(now);
                startDate.setHours(startParts[0], startParts[1], startParts[2], 0);

                const endDate = new Date(now);
                endDate.setHours(endParts[0], endParts[1], endParts[2], 0);

                // If start time is already passed today → set to tomorrow
                if (now > startDate) {
                    startDate.setDate(startDate.getDate() + 1);
                    endDate.setDate(endDate.getDate() + 1);
                }

                // Time until start
                const diffMs = startDate - now;
                const diffH = Math.floor(diffMs / (1000 * 60 * 60));
                const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                setTimeUntilStart(`${diffH}h ${diffM}m`);

                // Duration
                let durationMs = endDate - startDate;
                if (durationMs < 0) durationMs += 24 * 60 * 60 * 1000; // handle overnight
                const durH = Math.floor(durationMs / (1000 * 60 * 60));
                const durM = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                setDuration(`${durH}h ${durM}m`);

            };

            updateTime();
            const interval = setInterval(updateTime, 60 * 1000); // update every minute
            return () => clearInterval(interval);
        }, [daily_start, daily_end]);

        return (
            <div style={{ fontFamily: "sans-serif", padding: "10px", border: "1px solid #ccc" }}>
                <h3>Live Info</h3>
                <p>  🕒 {daily_start} - {daily_end}</p>

                <p>⏳ Time until live starts: {timeUntilStart}</p>
                <p>🕒 Live duration: {duration}</p>

            </div>
        );
    };

    const LiveDay = (daily) => {
        const date = new Date(daily);
        date.setDate(date.getDate() - 1);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    };

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentGroups = groups.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(groups.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h3>My Groups</h3>
            {currentGroups.map(group => (
                <div key={group.group_id} className="card mb-3 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{group.name}</h5>
                            <p>👥 {group.student_count} students</p>

                            {group.daily_start && group.daily_end && !group.range_start_date && (
                                <p>

                                    Daily
                                    <LiveSchedule daily_start={group.daily_start} daily_end={group.daily_end} />
                                </p>
                            )}

                            {group.range_start_date && group.range_end_date && (
                                <p>


                                    {`${LiveDay(group.range_start_date)} → ${LiveDay(group.range_end_date)}`}


                                    <LiveSchedule daily_start={group.daily_start} daily_end={group.daily_end} />
                                </p>
                            )}
                        </div>
                        <div>
                            <button
                                className="btn btn-primary me-2 text-dark"
                                onClick={() => {
                                    const roomId = `live-${Date.now()}-${group.group_id}`;
                                    startLiveSession(group.group_id, roomId, group.daily_start, group.daily_end);

                                }}
                            >
                                Start Live
                            </button>
                            <button
                                className="btn btn-outline-danger text-dark"
                                onClick={() => deleteGroup(group.group_id)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-outline-warning text-dark"
                                onClick={() => history.push(`/groups/${group.group_id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="d-flex justify-content-center mt-3">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary me-2"
                >
                    Prev
                </button>

                <span style={{ lineHeight: "2.5rem" }}>
                    Page {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary ms-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
