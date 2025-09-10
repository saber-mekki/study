import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GetImage from "../GetImage";
import Pagination from "@mui/material/Pagination"; 
import { useTranslation } from "react-i18next";

export default function CreateGroup() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleMode, setScheduleMode] = useState("daily");
  const [dailyStart, setDailyStart] = useState("");
  const [dailyEnd, setDailyEnd] = useState("");
  const [rangeStartDate, setRangeStartDate] = useState("");
  const [rangeEndDate, setRangeEndDate] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); 
  const studentsPerPage = 5;

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users`
        );
        const users = response.data.result.filter(
          (u) => u.type_register === "student"
        );
        setStudents(users);
      } catch (err) {
        alert("Error fetching users: " + err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/groups`,
        {
          name,
          description,
          tutor_id: user.idUser,
          schedule_mode: scheduleMode,
          daily_start: dailyStart,
          daily_end: dailyEnd,
          range_start_date:
            scheduleMode === "ranged" ? rangeStartDate : null,
          range_end_date: scheduleMode === "ranged" ? rangeEndDate : null,
        }
      );

      const groupId = groupRes.data.id;

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/groups/students`,
        {
          students: selectedStudents,
          groupId: groupId,
        }
      );

      toast.success("Group created successfully!");
      setName("");
      setDescription("");
      setSelectedStudents([]);
    } catch (err) {
      console.error(err);
      toast.error("Error creating group");
    }
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === paginatedStudents.length) {
      setSelectedStudents((prev) =>
        prev.filter((id) => !paginatedStudents.some((s) => s.user_id === id))
      );
    } else {
      const newSelections = paginatedStudents
        .filter((s) => !selectedStudents.includes(s.user_id))
        .map((s) => s.user_id);
      setSelectedStudents((prev) => [...prev, ...newSelections]);
    }
  };


  const filteredStudents = students.filter(
    (student) =>
      student.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const startIndex = (page - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="container mt-4">
      <h3>Create Group</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("Group Name")}</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("Description")}</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("Schedule Mode")}</label>
          <select
            className="form-control"
            value={scheduleMode}
            onChange={(e) => setScheduleMode(e.target.value)}
          >
            <option value="daily">{t("Daily")} (fixed hours)</option>
            <option value="ranged">{t("Date Range with hours")}</option>
          </select>
        </div>

        {scheduleMode === "daily" && (
          <>
            <div className="mb-3">
              <label>{t("Start Time")}</label>
              <input
                type="time"
                className="form-control"
                value={dailyStart}
                onChange={(e) => setDailyStart(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>{t("End Time")}</label>
              <input
                type="time"
                className="form-control"
                value={dailyEnd}
                onChange={(e) => setDailyEnd(e.target.value)}
              />
            </div>
          </>
        )}

        {scheduleMode === "ranged" && (
          <>
            <div className="mb-3">
              <label>{t("Start Date")}</label>
              <input
                type="date"
                className="form-control"
                value={rangeStartDate}
                onChange={(e) => setRangeStartDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>{t("End Date")}</label>
              <input
                type="date"
                className="form-control"
                value={rangeEndDate}
                onChange={(e) => setRangeEndDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>{t("Daily Start Time")}</label>
              <input
                type="time"
                className="form-control"
                value={dailyStart}
                onChange={(e) => setDailyStart(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>{t("Daily End Time")}</label>
              <input
                type="time"
                className="form-control"
                value={dailyEnd}
                onChange={(e) => setDailyEnd(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label">{t("Search Students")}</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); 
            }}
          />
        </div>

        {paginatedStudents.length > 0 && (
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={
                paginatedStudents.every((s) =>
                  selectedStudents.includes(s.user_id)
                ) && paginatedStudents.length > 0
              }
              onChange={toggleSelectAll}
            />
            <label className="form-check-label">{t("Select All ")} (This Page)</label>
          </div>
        )}

        <div className="mb-3">
          {paginatedStudents.map((student) => (
            <div key={student.user_id} className="form-check d-flex align-items-center">
              <GetImage id={student.user_id} user_name={student.user_name} />
              <input
                className="form-check-input ms-2"
                type="checkbox"
                checked={selectedStudents.includes(student.user_id)}
                onChange={() => toggleStudentSelection(student.user_id)}
              />
              <label className="form-check-label ms-2">
                {student.user_name} ({student.user_email})
              </label>
            </div>
          ))}
        </div>

        {filteredStudents.length > studentsPerPage && (
          <div className="d-flex justify-content-center">
            <Pagination
              count={Math.ceil(filteredStudents.length / studentsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}

        <button type="submit" className="btn btn-success mt-3">
        {t("Create Group")} 
        </button>
      </form>
    </div>
  );
}
