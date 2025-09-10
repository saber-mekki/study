// TutorProfile.tsx
import axios from "axios";
import { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RatingUser({ tutorId, studentId ,loading}) {
 const { t } = useTranslation();
  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

 const handleSubmitRating = () => {
    if (!userRating) {
      alert("Please select a rating before submitting.");
      return;
    }
    setSubmitting(true);

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/rating`, {
        tutorId: tutorId,           
        studentId:  studentId,  
        rating: userRating,
        comment,
      })
      .then(() => {
        setUserRating(null);
        setComment("");
      })
      .catch((err) => {
        console.error("Error submitting rating", err);
      })
      .finally(() => setSubmitting(false));
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box >

      <Box
        mt={2}
        mb={2}
        width="100%"
        sx={{ borderTop: "1px solid #eee" }}
      />

      <Typography variant="subtitle1" fontWeight="bold">
       {t("Rate this tutor")}
      </Typography>

      <Rating
        value={userRating}
        onChange={(e, newValue) => setUserRating(newValue)}
        precision={1}
        size="large"
        sx={{ mt: 1 }}
      />

      <TextField
        label="Comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={2}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmitRating}
        disabled={submitting}
      >
        {submitting ? `${t("Submitting")}...` :  t("Submit Rating")}
      </Button>
    </Box>
  );
}
