import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const Announcements = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [pageSize] = useState(5);
  const [showInfo, setShowInfo] = useState(true); 

  useEffect(() => {
    if (user?.idUser) {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/announcements/${user.idUser}?userType=${user.role}`
        )
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [user]);

  const handleRead = async (announcementId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/announcements/read`, {
        announcementId,
        userId: user.idUser,
      });
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const startIndex = (page - 1) * pageSize;
  const currentMessages = messages.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (event, value) => {
    setPage(value);
    setSelectedIndex(null);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        📩{t("Chat")}
      </Typography>

      {showInfo && (
        <Alert
          severity="info"
          sx={{ mb: 2 }}
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => setShowInfo(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {t("Ici vous trouverez les")}<strong>{t("messages de l’administrateur")}</strong> {t("ainsi que vos")} <strong>{t("résultats")}</strong>.
        </Alert>
      )}

      {messages.length === 0 && <p>{t("Aucun message pour le moment.")}</p>}

      {selectedIndex === null &&
        currentMessages.map((msg, idx) => (
          <Card
            key={msg.id}
            className="mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedIndex(startIndex + idx);
              handleRead(msg.id);
            }}
          >
            <CardContent>
              <Typography variant="h6">{msg.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(msg.created_at).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}

      {selectedIndex !== null && (
        <Card className="p-3">
          <CardContent>
            <Typography variant="h5">{messages[selectedIndex].title}</Typography>
            <Typography variant="body1" className="mt-2">
              {messages[selectedIndex].content}
            </Typography>
            {messages[selectedIndex].signed_url && (
              <Button
                href={messages[selectedIndex].signed_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="primary"
                size="small"
                className="mt-2"
              >
                📄 {t("Voir le PDF")}
              </Button>
            )}
            <Typography
              variant="caption"
              color="textSecondary"
              display="block"
              className="mt-2"
            >
              {new Date(messages[selectedIndex].created_at).toLocaleString()}
            </Typography>

            <div className="mt-3 d-flex justify-content-between">
              <Button variant="contained" onClick={() => setSelectedIndex(null)}>
                {t("Retour à la liste")}
              </Button>
              <div>
                <Button
                  variant="outlined"
                  disabled={selectedIndex === 0}
                  onClick={() => setSelectedIndex((prev) => prev - 1)}
                  style={{ marginRight: "8px" }}
                >
                  {t("Précédent")}
                </Button>
                <Button
                  variant="outlined"
                  disabled={selectedIndex === messages.length - 1}
                  onClick={() => setSelectedIndex((prev) => prev + 1)}
                >
                  {t("Suivant")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}


      {selectedIndex === null && messages.length > pageSize && (
        <div className="mt-3 d-flex justify-content-center">
          <Pagination
            count={Math.ceil(messages.length / pageSize)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default Announcements;
