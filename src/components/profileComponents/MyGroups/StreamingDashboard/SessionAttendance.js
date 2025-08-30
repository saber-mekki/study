import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Box,
  TextField,
} from "@mui/material";

export default function SessionAttendance() {
  const [students, setStudents] = useState([]);
  const [sessionNote, setSessionNote] = useState(""); 
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/sessions/${sessionId}/attendance`)
      .then((res) => {
        setStudents(res.data.students || res.data); 
        setSessionNote(res.data.sessionNote || "");
      })
      .catch((err) => console.error(err));
  }, [sessionId]);

  function timeToISO(timeString) {
    const today = new Date().toISOString().split("T")[0];
    const dateTime = new Date(`${today}T${timeString}`);
    return dateTime.toISOString();
  }

  const handleMark = (studentId, status, start_time) => {
    const payload = { sessionId, studentId, status };

    if (status === "present") {
      payload.joinedAt = timeToISO(start_time);
    }
    if (status === "absent") {
      payload.leftAt = new Date().toISOString();
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/sessions/attendance`, payload)
      .then(() => {
        setStudents(
          students.map((s) =>
            s.student_id === studentId
              ? {
                  ...s,
                  status,
                  ...(payload.joinedAt ? { joined_at: payload.joinedAt } : {}),
                  ...(payload.leftAt ? { left_at: payload.leftAt } : {}),
                }
              : s
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleStudentNoteChange = (studentId, note) => {
    setStudents(
      students.map((s) =>
        s.student_id === studentId ? { ...s, note } : s
      )
    );
  };

  const saveStudentNote = (studentId, note) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/sessions/attendance/${studentId}/note`, {
        sessionId,
        note,
      })
      .then(() => console.log(`Note saved for student ${studentId}`))
      .catch((err) => console.error(err));
  };
  
  

  const saveSessionNote = () => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/sessions/${sessionId}/note`, {
        
        session_note: sessionNote,
      })
      .then(() => console.log("Session note saved"))
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Session Attendance
        </Typography>

       
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            General Note:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={sessionNote}
            onChange={(e) => setSessionNote(e.target.value)}
            placeholder="Write a general note about this session..."
          />
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={saveSessionNote}
          >
            Save Session Note
          </Button>
        </Box>

       
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Note</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.student_id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  {s.status ? (
                    <Chip
                      label={s.status}
                      color={s.status === "present" ? "success" : "error"}
                      variant="outlined"
                    />
                  ) : (
                    <Chip label="Not Marked" color="default" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={s.note || ""}
                    onChange={(e) =>
                      handleStudentNoteChange(s.student_id, e.target.value)
                    }
                    onBlur={() => saveStudentNote(s.student_id, s.note || "")}
                    placeholder="Tutor note..."
                  />
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" gap={1} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleMark(s.student_id, "present", s.start_time)
                      }
                    >
                      Present
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleMark(s.student_id, "absent", s.start_time)
                      }
                    >
                      Absent
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
