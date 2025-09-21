import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Pagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function GroupSessions() {
  const { t } = useTranslation();
    const user = useSelector((state) => state.user);
  const { groupId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const sessionsPerPage = 6;
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupId}/sessions`)
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupId}/attendance`)
      .then((res) => {
        const formatted = res.data.map((s) => ({
          user_id: s.user_id,
          name: s.user_name,
          present_count: Number(s.present_count),
          absent_count: Number(s.absent_count),
          late_count: Number(s.late_count),
          total_sessions: Number(s.total_sessions),
          
        }));
        setAttendance(formatted);
      })
      .catch((err) => console.error(err));
  }, [groupId]);

  const handleNewSession = async () => {
    try {
      const today = new Date();
      const sessionDate = today.toISOString().split("T")[0];
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/groups/sessions`,
        {
          group_id: groupId,
          session_date: sessionDate,
          start_time: "10:00",
          end_time: "11:00",
          meeting_link: `/room-meating/${Date.now()}`,
          status: "active",
        }
      );
      const id = res.data.id;
      localStorage.setItem("sessionId", id);
      setSessions([...sessions, res.data]);
      history.push(`/room-meating/${id}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const startIndex = (page - 1) * sessionsPerPage;
  const paginatedSessions = sessions.slice(
    startIndex,
    startIndex + sessionsPerPage
  );
  const pageCount = Math.ceil(sessions.length / sessionsPerPage);

  const barData = {
    labels: attendance.map((s) => s.name),
    datasets: [
      { label: "Present", data: attendance.map((s) => s.present_count), backgroundColor: "#4caf50" },
      { label: "Absent", data: attendance.map((s) => s.absent_count), backgroundColor: "#f44336" },
      { label: "Late", data: attendance.map((s) => s.late_count), backgroundColor: "#ff9800" },
    ],
  };

  const pieData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        data: [
          attendance.reduce((acc, s) => acc + s.present_count, 0),
          attendance.reduce((acc, s) => acc + s.absent_count, 0),
          attendance.reduce((acc, s) => acc + s.late_count, 0),
        ],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
      },
    ],
  };

  return (
    <Box maxWidth="lg" sx={{ mx: "auto", p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          {t("Group Sessions")}
        </Typography>
        {user.role === "tutor"&&  <Button variant="contained" color="primary" onClick={handleNewSession}>
          + {t("Start New Session")}
        </Button>}
      </Box>

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <Box textAlign="center" py={8} sx={{ bgcolor: "grey.100", borderRadius: 3 }}>
          <Typography>{t("No sessions yet. Start one")}!</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedSessions.map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6"> {t("Session")}: {s.start_time}-{s.end_time}</Typography>
                    <Typography>{t("Date")}: {s.session_date}</Typography>
                    <Chip
                      label={s.status}
                      color={s.status === "active" ? "success" : "default"}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      color="warning"
                      fullWidth
                      onClick={() => history.push(`/session-attendance/${s.id}`)}
                    >
                      {t("Manage Attendance")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                shape="rounded"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      {user.role === "tutor" && attendance.length > 0 && (
        <Box mt={9}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t("Attendance Statistics")}
          </Typography>

        
            <Grid item xs={12} md={7} sx={{ height: "700px" }}>
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </Grid>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
            {t("For all")}
          </Typography>
            <Grid item xs={12} md={7} sx={{ height: "700px" }}>
              <Bar data={pieData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
            </Grid>
      
        </Box>
      )}
    </Box>
  );
}
