import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import ChangePassword from "./ChangePassword";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("language") || "en");
  const [openDelete, setOpenDelete] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const user = useSelector((state) => state.user);

  const handleLangChange = (e) => setLang(e.target.value);
  const saveLang = () => { 
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);}

  const handleDeleteAccount = async () => {
    try {

      const token = localStorage.getItem("authToken");
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/deleteUser`,
        { id: user.idUser },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("authToken");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(t("An error occurred while deleting your account."));
    } finally {

      setOpenDelete(false)
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h6" color="primary" gutterBottom>
      {t("Settings")}
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
          {t("Language")}
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              select
              value={lang}
              onChange={handleLangChange}
              size="small"
            >
              <MenuItem value="en">{t("English")}</MenuItem>
              <MenuItem value="fr">{t("French")}</MenuItem>
              <MenuItem value="gr">{t("German")}</MenuItem>
              <MenuItem value="ar">{t("Arabic")}</MenuItem>
            </TextField>
            <Button variant="contained" onClick={saveLang}>           
              {t("Save")}
            </Button>
          </Stack>
        </Box>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            {t("Security")}
          </Typography>
          <Button variant="outlined" onClick={() => setOpenPassword(true)}>
            {t("change_password")}
          </Button>
        </Box>

        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenDelete(true)}
        >
          {t("Delete Account")}
        </Button>
      </Stack>

      <Dialog
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle>{t("change_password")}</DialogTitle>
        <DialogContent dividers>
          <ChangePassword
            email={user?.email}
            onSuccess={() => setOpenPassword(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPassword(false)}>Close{t("Security")}</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>{t("Confirm Deletion")}</DialogTitle>
        <DialogContent>
          
          {t("Are you sure you want to permanently delete your account?")}        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>{t("Cancel")}</Button>
          <Button color="error" variant="contained" onClick={handleDeleteAccount}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
