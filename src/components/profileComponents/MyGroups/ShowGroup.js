import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
export default function ShowGroup({groupStudent}) {

    const [sessionActive, setSessionActive] = useState(false);
  const [link, setLink] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupStudent.id}/sessions`)
            .then((res) => {
               
                res.data.forEach((data)=>{
                    
                    if(data.status ==='active') {
                        setSessionActive(true);
                        setLink(data.meeting_link)
                      
                      }
                }) 
           
            })
            .catch((err) => {
                console.error(err);
            });
    }, [groupStudent]);

    const history = useHistory();
  
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

                if (now > startDate) {
                    startDate.setDate(startDate.getDate() + 1);
                    endDate.setDate(endDate.getDate() + 1);
                }

                const diffMs = startDate - now;
                const diffH = Math.floor(diffMs / (1000 * 60 * 60));
                const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                setTimeUntilStart(`${diffH}h ${diffM}m`);

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



    return (
        <div className="container mt-4">
            <h3>My Groups</h3>

                <div key={groupStudent.group_id} className="card mb-3 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{groupStudent.name}</h5>
                            <p>👥 {groupStudent.student_count} students</p>

                            {groupStudent.daily_start && groupStudent.daily_end && !groupStudent.range_start_date && (
                                <p>

                                    Daily
                                    <LiveSchedule daily_start={groupStudent.daily_start} daily_end={groupStudent.daily_end} />
                                </p>
                            )}

                            {groupStudent.range_start_date && groupStudent.range_end_date && (
                                <p>


                                    {`${LiveDay(groupStudent.range_start_date)} → ${LiveDay(groupStudent.range_end_date)}`}


                                    <LiveSchedule daily_start={groupStudent.daily_start} daily_end={groupStudent.daily_end} />
                                </p>
                            )}
                        </div>
                        <div>
                            <button
                             style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                backgroundColor: sessionActive ? "green" : "gray",
                                color: "white",
                                border: "none",
                                cursor: sessionActive ? "pointer" : "not-allowed",
                              }}
                              disabled={!sessionActive}
                             
                                onClick={() =>{
                                    history.push(link);
                                }}
                            >
                               Entrer en Live
                            </button>
                            <button
                                className="btn btn-outline-warning text-dark"
                                onClick={() => history.push(`/groups/${groupStudent.id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
        
      
        </div>
    );
}
