import React from "react";
import { useEffect } from "react";
import axios from "axios";

const JitsiMeeting = ({ role, userName, bookingId }) => {

  useEffect(() => {
      return () => {
        if (role === "tutor" ) {
        const storedSessionId = localStorage.getItem("sessionId");
        try {
          axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/groups/sessions/${storedSessionId}/close`
          );
          localStorage.removeItem("sessionId");
        } catch (error) {
          console.error("Erreur lors de la fermeture de la session :", error);
        }
      }
      };
  }, [role]);

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <iframe
        allow="camera; microphone; fullscreen; display-capture"
        src={`https://meet.jit.si/${bookingId}#userInfo.displayName="${userName}"`}
        style={{ height: "100%", width: "100%", border: 0 }}
        title="Jitsi"
      />
    </div>
  );
};

export default JitsiMeeting;
