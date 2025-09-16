import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Alert,
  LinearProgress,
  Button,
  Snackbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ChangePassword({ email }) {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const [successOpen, setSuccessOpen] = useState(false);

  const checkStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // 0-4
  };

  useEffect(() => {
    setStrength(checkStrength(newPassword));
  }, [newPassword]);

  const getStrengthLabel = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "error";
      case 2:
      case 3:
        return "warning";
      case 4:
        return "success";
      default:
        return "primary";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(t("error.passwordsDoNotMatch"));
      return;
    }

    if (strength < 3) {
      setError(t("Password is too weak"));
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email,
        password: currentPassword,
      });

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/updatePassword`, {
        email,
        password: newPassword,
      });

      setSuccessOpen(true); 
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to update password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Stack spacing={2}>
          <TextField
            type="password"
            label={t("changePassword.currentPassword")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="password"
            label={t("changePassword.newPassword")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
          />
          {newPassword && (
            <Box>
              <Typography variant="caption">
                {t("Strength")}: {getStrengthLabel(strength)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(strength / 4) * 100}
                color={getStrengthColor(strength)}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          )}
          <TextField
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            disabled={loading || strength < 3}
            fullWidth
            sx={{ mt: 1, py: 1.2 }}
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("changePassword.updateSuccessTitle")}
        </Alert>
      </Snackbar>
    </>
  );
}
