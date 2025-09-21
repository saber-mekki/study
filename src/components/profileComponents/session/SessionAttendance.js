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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function SessionAttendance() {
  const { t } = useTranslation();
  const { sessionId } = useParams();
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionPDF, setSessionPDF] = useState(null);
  const [newPdfUrls, setNewPdfUrls] = useState([]); 
  const user = useSelector((state) => state.user);

    const uploadSessionPDF = () => {
      if (!sessionPDF) return;
  
      const formData = new FormData();
      formData.append("session_pdf", sessionPDF);
      formData.append("session_id", sessionId);
  
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/sessions/upload-pdf`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setNewPdfUrls((prev) => [...prev, res.data]); 
          setSessionPDF(null);
        })
        .catch((err) => console.error("PDF upload error:", err));
    };
    const handleDeletePDF = async (pdfId) => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/sessions/${sessionId}/pdfs/${pdfId}`
        );
        setPdfs((prev) => prev.filter((pdf) => pdf.id !== pdfId));
      } catch (err) {
        console.error("Error deleting PDF:", err);
      }
    };
    
  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sessions/${sessionId}/pdfs`);
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPDFs();
  }, [sessionId,newPdfUrls]);

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
            {t("Session Attendance")}
        </Typography>
        <Typography
    variant="subtitle1"
    color="text.secondary"
    sx={{ mb: 2, fontStyle: "italic" }}
  >
    {t("General Note")}: {students[0]&&students[0].session_note}
  </Typography>
  {loading ? (
  <p>{t("Loading PDFs")}:...</p>
) : (
  <div>
    <h3>Session PDFs{t("Loading PDFs")}</h3>
    {pdfs.length === 0 ? (
      <p>{t("No PDFs uploaded yet")}.</p>
    ) : (
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id}>
            <a href={pdf.signed_url} target="_blank" rel="noopener noreferrer">
               {t("PDF uploaded at")}{new Date(pdf.uploaded_at).toLocaleString()}
            </a>
        {user.role === "tutor" &&<Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ ml: 2 }}
              onClick={() => handleDeletePDF(pdf.id)}
            >
              {t("Delete")}
            </Button>
            }    
          </li>
        ))}
      </ul>
    )}
  </div>
)}
 {user.role === "tutor" &&   <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("Add new PDFs")}:
          </Typography>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSessionPDF(e.target.files[0]);
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={uploadSessionPDF}
            disabled={!sessionPDF}
          >
            {t("Upload PDF")}
          </Button>

          {newPdfUrls.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {newPdfUrls.map((pdf, i) => (
                <Typography key={pdf.id || i} variant="body2">
                  PDF{t("PDF")} {i + 1}:{" "}
                  <a href={pdf.pdf_url} target="_blank" rel="noopener noreferrer">
                    {t("View")}
                  </a>
                </Typography>
              ))}
            </Box>
          )}
        </Box>}


        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>{t("Student")}</strong></TableCell>
              <TableCell><strong>{t("Status")}</strong></TableCell>
              {user.role === "tutor" &&   <TableCell><strong>{t("Note")}</strong></TableCell>}
              {user.role === "tutor" && <TableCell align="right"><strong>{t("Actions")}</strong></TableCell>}
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


                  {user.role === "tutor" &&  <TableCell>
                    {s.note}
                  </TableCell>}
                  {user.role === "tutor" &&  <TableCell align="right">
                    <Box display="flex" gap={1} justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleMark(s.student_id, "present", s.start_time)
                        }
                      >
                        {t("Present")}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleMark(s.student_id, "absent", s.start_time)
                        }
                      >
                        {t("Absent")}
                      </Button>
                    </Box>
                  </TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>

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
