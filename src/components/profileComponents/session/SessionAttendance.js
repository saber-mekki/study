import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
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
  TablePagination,
} from "@mui/material";
import GetImage from "../GetImage";

export default function SessionAttendance() {
  const { sessionId } = useParams();
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/sessions/${sessionId}/attendance`)
      .then((res) => setStudents(res.data))
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

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Session Attendance
        </Typography>
        <Typography
    variant="subtitle1"
    color="text.secondary"
    sx={{ mb: 2, fontStyle: "italic" }}
  >
    General Note: {students[0]&&students[0].session_note}
  </Typography>
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
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((s) => (
                <TableRow key={s.student_id}>
                  <TableCell>
                    <Link to={`/user/${s.student_id}`}>
                      <GetImage id={s.student_id} user_name={s.name} />
                    </Link>
                    <Link to={`/user/${s.student_id}`}>
                      <Typography variant="h6">{s.name}</Typography>
                    </Link>
                  </TableCell>

                  <TableCell>
                    {s.status ? (
                      <Chip
                        label={s.status}
                        color={s.status === "present" ? "success" : "error"}
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label="Not Marked"
                        color="default"
                        variant="outlined"
                      />
                    )}
                  </TableCell>


                  <TableCell>
                    {s.note}
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

        {/* Pagination */}
        <TablePagination
          component="div"
          count={students.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Container>
  );
}
