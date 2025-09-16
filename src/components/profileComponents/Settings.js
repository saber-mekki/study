import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";

// ✅ MUI imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false); // dialog state
  const user = useSelector((state) => state.user);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleConfirmLanguageChange = () => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  // open dialog
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
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
      setIsDeleting(false);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <h6 className="mb-2 text-primary">{t("Settings")}</h6>
      <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          {/* Language selection */}
          <div className="form-group">
            <label htmlFor="language">{t("Language")}</label>
            <select
              className="form-control"
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">{t("English")}</option>
              <option value="fr">{t("French")}</option>
              <option value="gr">{t("German")}</option>
              <option value="ar">{t("Arabic")}</option>
            </select>
          </div>

          <button
            onClick={handleConfirmLanguageChange}
            type="button"
            className="btn btn-danger mt-2"
          >
            {t("Confirm")}
          </button>

          <hr className="my-4" />

          {/* Delete account with Material-UI popup */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleOpenDialog}
            disabled={isDeleting}
          >
            {t("Delete Account")}
          </Button>

          <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="delete-account-title"
          >
            <DialogTitle id="delete-account-title">
              {t("Confirm Deletion")}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t("Are you sure you want to permanently delete your account?")}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>{t("Cancel")}</Button>
              <Button
                onClick={handleDeleteAccount}
                color="error"
                variant="contained"
                disabled={isDeleting}
              >
                {isDeleting ? t("Deleting...") : t("Delete")}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
