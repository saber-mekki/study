import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
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
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export default function GroupSessions() {
  const { groupId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const sessionsPerPage = 6;
  const history = useHistory();

  useEffect(() => {
    // Fetch sessions
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupId}/sessions`)
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));

    // Fetch attendance stats
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupId}/attendance`)
      .then((res) => {
        // Convert string counts to numbers
        
     
        const formatted = res.data.map((s) => ({
  user_id: s.user_id,
  name: s.user_name,
  present_count: Number(s.present_count),
  absent_count: Number(s.absent_count),
  late_count: Number(s.late_count),
  total_sessions: Number(s.total_sessions),
}));
        console.log({formatted})
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

  // Pagination
  const startIndex = (page - 1) * sessionsPerPage;
  const paginatedSessions = sessions.slice(startIndex, startIndex + sessionsPerPage);
  const pageCount = Math.ceil(sessions.length / sessionsPerPage);

  const COLORS = ["#4caf50", "#f44336"];

  return (
    <Box maxWidth="lg" sx={{ mx: "auto", p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Group Sessions
        </Typography>
        <Button variant="contained" color="primary" sx={{ borderRadius: 2, px: 3, py: 1 }} onClick={handleNewSession}>
          + Start New Session
        </Button>
      </Box>

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <Box textAlign="center" py={8} sx={{ bgcolor: "grey.100", borderRadius: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No sessions yet. Start one!
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedSessions.map((s) => (
              <Grid item xs={12} sm={6} md={4} key={s.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Session #{s.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: <strong>{s.session_date}</strong>
                    </Typography>
                    <Chip label={s.status} color={s.status === "active" ? "success" : "default"} size="small" sx={{ mt: 1 }} />
                  </CardContent>
                  <CardActions sx={{ p: 2, gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="warning"
                      fullWidth
                      onClick={() => history.push(`/session-attendance/${s.id}`)}
                    >
                      Manage Attendance
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination count={pageCount} page={page} onChange={(e, value) => setPage(value)} color="primary" shape="rounded" size="large" />
            </Box>
          )}
        </>
      )}

      {/* Attendance Stats */}
      {attendance.length > 0 && (
        <Box mt={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Attendance Statistics
          </Typography>

          <Grid container spacing={4}>
            {/* Bar Chart */}
            <Grid item xs={12} md={7}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present_count" fill="#4caf50" name="Present" />
                  <Bar dataKey="absent_count" fill="#f44336" name="Absent" />
                  <Bar dataKey="late_count" fill="#ff9800" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={5}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Present", value: attendance.reduce((acc, s) => acc + s.present_count, 0) },
                      { name: "Absent", value: attendance.reduce((acc, s) => acc + s.absent_count, 0) },
                      { name: "Late", value: attendance.reduce((acc, s) => acc + s.late_count, 0) },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {["#4caf50", "#f44336", "#ff9800"].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
