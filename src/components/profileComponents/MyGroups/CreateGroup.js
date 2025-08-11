import React, { useState, useEffect } from "react";
import axios from "axios";
 import { useSelector } from "react-redux";
import {  toast } from 'react-toastify';

export default function CreateGroup() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [scheduleMode, setScheduleMode] = useState("daily");
    const [dailyStart, setDailyStart] = useState("");
    const [dailyEnd, setDailyEnd] = useState("");
    const [rangeStartDate, setRangeStartDate] = useState("");
    const [rangeEndDate, setRangeEndDate] = useState("");
    
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
 const user = useSelector((state) => state.user);

  useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
                const users = response.data.result;
                const students=[]
                users.forEach((user) => {                    
                        if (user.type_register === "student" ) {
                          students.push(user)
                        }                                        
                    })
                    setStudents(students) 
            } catch (err) {
                alert("Error fetching users: " + err.message);
            }
        };

        fetchUsers();
    }, []);

 
    // Create group and add selected students
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1️⃣ Create group
            const groupRes = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/groups`, {
                name,
                description,
                tutor_id: user.idUser,
                schedule_mode: scheduleMode,
                daily_start: dailyStart,
                daily_end: dailyEnd,
                range_start_date: scheduleMode === "ranged" ? rangeStartDate : null,
                range_end_date: scheduleMode === "ranged" ? rangeEndDate : null
            });

            const groupId = groupRes.data.id;

            // 2️⃣ Add selected students
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/groups/students`, {
                students: selectedStudents,
                groupId:groupId
            });

              toast.success('Group created successfully!');  
            setName("");
            setDescription("");
            setSelectedStudents([]);
        } catch (err) {
            console.error(err);
             toast.error('Error creating group');
        }
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <div className="container mt-4">
            <h3>Create Group</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Group Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
  <label className="form-label">Schedule Mode</label>
  <select
    className="form-control"
    value={scheduleMode}
    onChange={(e) => setScheduleMode(e.target.value)}
  >
    <option value="daily">Daily (fixed hours)</option>
    <option value="ranged">Date Range with hours</option>
  </select>
</div>

{scheduleMode === "daily" && (
  <>
    <div className="mb-3">
      <label>Start Time</label>
      <input type="time" className="form-control" value={dailyStart} onChange={(e) => setDailyStart(e.target.value)} />
    </div>
    <div className="mb-3">
      <label>End Time</label>
      <input type="time" className="form-control" value={dailyEnd} onChange={(e) => setDailyEnd(e.target.value)} />
    </div>
  </>
)}

{scheduleMode === "ranged" && (
  <>
    <div className="mb-3">
      <label>Start Date</label>
      <input type="date" className="form-control" value={rangeStartDate} onChange={(e) => setRangeStartDate(e.target.value)} />
    </div>
    <div className="mb-3">
      <label>End Date</label>
      <input type="date" className="form-control" value={rangeEndDate} onChange={(e) => setRangeEndDate(e.target.value)} />
    </div>
    <div className="mb-3">
      <label>Daily Start Time</label>
      <input type="time" className="form-control" value={dailyStart} onChange={(e) => setDailyStart(e.target.value)} />
    </div>
    <div className="mb-3">
      <label>Daily End Time</label>
      <input type="time" className="form-control" value={dailyEnd} onChange={(e) => setDailyEnd(e.target.value)} />
    </div>
  </>
)}

                <div className="mb-3">
                    <label className="form-label">Select Students</label>
                    {students.map(student => (
                        <div key={student.user_id} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedStudents.includes(student.user_id)}
                                onChange={() => toggleStudentSelection(student.user_id)}
                            />
                            <label className="form-check-label">
                                {student.user_name}
                            </label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-success">Create Group</button>
            </form>
        </div>
    );
}
