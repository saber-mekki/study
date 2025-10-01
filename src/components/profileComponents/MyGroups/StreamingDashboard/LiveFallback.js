import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function LiveFallback({ roomId, userName }) {
  const { t } = useTranslation();
  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/backup-link`,
          { params: { roomId } }
        );
        if (!stop) setLinks(data);
      } catch (e) {
        if (!stop) setLinks(null);
      } finally {
        if (!stop) setLoading(false);
      }
    })();
    return () => { stop = true; };
  }, [roomId]);

  if (loading) return <div className="card">{t("Préparation des liens de secours")}…</div>;
  if (!links) return <div className="card">{t("Impossible de générer des liens de secours.")}</div>;

  const zoomJoinUrl = links.zoomMeetingNumber
    ? `https://zoom.us/wc/${links.zoomMeetingNumber}/join?pwd=${encodeURIComponent(
        links.zoomPwd || ""
      )}&uname=${encodeURIComponent(userName || "Invité")}`
    : null;

  return (
    <div className="card">
      <h2>{t("Use Zoom if the main video has an issue.")}</h2>
      <p className="text-muted">{t("Join via a backup link")}:</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {zoomJoinUrl && (
          <a className="btn btn-primary" href={zoomJoinUrl} target="_blank" rel="noreferrer">
           {t(" Continue on Zoom")}
          </a>
        )}
        {!links.meetUrl && !zoomJoinUrl && <span>{t("No link available.")}</span>}
      </div>
    </div>
  );
}
