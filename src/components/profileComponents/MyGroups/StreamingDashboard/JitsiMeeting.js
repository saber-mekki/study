import React from "react";
import { useEffect } from "react";
import axios from "axios";

const JitsiMeeting = ({  userName,bookingId }) => {

  useEffect(() => {
    const handleUnload = () => {
      try {
         axios.put(`${process.env.REACT_APP_API_BASE_URL}/booking/update`, {
          bookingId,
          liveLink: ""
        })
      } catch (error) {
        console.error("Erreur lors de la mise à jour du lien live :", error);
      }
    };
    window.addEventListener("beforeunload",  handleUnload);

    return () => {
       handleUnload();
      window.removeEventListener("beforeunload",  handleUnload);
    };
  }, [bookingId]);

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
