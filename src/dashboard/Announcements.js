import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const SendAnnouncement = () => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdf, setPdf] = useState(null);
  const [recipientType, setRecipientType] = useState("all");
  const [usersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
        setUsersList(res.data.result || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSend = async () => {
    if (!title || !content) {
      setErrorMsg("Title and content are required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("recipientType", recipientType); // all, student, tutor
      if (recipientType === "custom") {
        formData.append("userIds", JSON.stringify(selectedUsers));
      }
      if (pdf) formData.append("pdf", pdf);

     await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/announcements/send`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccessMsg("Message sent successfully!");
      setTitle("");
      setContent("");
      setPdf(null);
      setSelectedUsers([]);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        📨 {t("Send Announcement")} 
      </Typography>

      <Stack spacing={2} sx={{ maxWidth: 500, mt: 2 }}>
        {errorMsg && <Typography color="error">{errorMsg}</Typography>}
        {successMsg && <Typography color="primary">{successMsg}</Typography>}

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>{t("Recipients")} </InputLabel>
          <Select
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
          >
            <MenuItem value="all">{t("All Users")} </MenuItem>
            <MenuItem value="students">{t("Students")} </MenuItem>
            <MenuItem value="tutors">{t("Tutors")} </MenuItem>
            <MenuItem value="custom">{t("Select Specific Users")} </MenuItem>
          </Select>
        </FormControl>

        {recipientType === "custom" && (
          <FormControl fullWidth>
            <InputLabel>{t("Select Users")} </InputLabel>
            <Select
              multiple
              value={selectedUsers}
              onChange={(e) => setSelectedUsers(e.target.value)}
            >
              {usersList.map((user) => (
                <MenuItem key={user.user_id} value={user.user_id}>
                  {user.user_name} ({user.type_register})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button variant="contained" component="label">
           {t("Upload PDF")} ({t("optional")})
          <input type="file" hidden accept="application/pdf" onChange={handlePdfChange} />
        </Button>

        {pdf && <Typography>{t("Selected file")} : {pdf.name}</Typography>}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send Message"}
        </Button>
      </Stack>
    </div>
  );
};

export default SendAnnouncement;
