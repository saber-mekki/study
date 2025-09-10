import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionTwo from "../../layouts/SectionTwo";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import GetImage from "../GetImage";
import { useTranslation } from "react-i18next";

export default function GroupDetails() {
  const { t } = useTranslation();
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/groups/${groupId}/students`)
      .then((res) => {
        setGroup(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load group data.");
        setLoading(false);
      });
  }, [groupId]);



  if (loading)
    return (
      <SectionTwo title="Loading...">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </SectionTwo>
    );

  if (error)
    return (
      <SectionTwo title="Error">
        <Alert severity="error">{error}</Alert>
      </SectionTwo>
    );

  if (!group) return null;

  return (
    <SectionTwo title={group.name}>
       
      <Box sx={{ mt: 4,ml:4,mb:7 }}>
        <Typography variant="h4" gutterBottom>
          {group.name}
        </Typography>

        {group.description && (
          <Typography paragraph>{group.description}</Typography>
        )}

        <Typography>
          <b>{t("Tutor")}:</b> {group.tutor_name}
        </Typography>
        <Typography>
          <b>{t("Schedule Mode")}:</b> {group.schedule_mode}
        </Typography>

        {group.schedule_mode === "daily" && (
          <Typography>
            {t("Daily")}: {group.daily_start} - {group.daily_end}
          </Typography>
        )}

        {group.schedule_mode === "ranged" && (
          <Typography>
             {t("From")}{new Date(group.range_start_date).toLocaleDateString()}{t("to")} {" "}
            {new Date(group.range_end_date).toLocaleDateString()}
          </Typography>
        )}

        <Typography variant="h5" mt={3} gutterBottom>
          {t("Students")}:
        </Typography>

        {group.students.length === 0 ? (
          <Typography>{t("No students in this group")}.</Typography>
        ) : (
          <Grid container spacing={3}>
            {group.students.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student.user_id}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                    <Link to={`/user/${student.user_id}`}>   <GetImage id={student.user_id} user_name={student.user_name} /></Link>
             
                  <CardContent sx={{ flex: "1 0 auto" }}>
                  <Link to={`/user/${student.user_id}`}>    <Typography variant="h6">{student.user_name}</Typography></Link>
                   
                    <Typography color="text.secondary" variant="body2">
                      {student.user_email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    </SectionTwo>
  );
}
