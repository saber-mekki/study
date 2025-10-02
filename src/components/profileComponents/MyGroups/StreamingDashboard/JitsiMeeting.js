import React, { useEffect, useRef } from "react";
import axios from "axios";

const JitsiMeeting = ({ role, userName, bookingId }) => {
  const containerRef = useRef(null);
  const apiRef = useRef(null);

  const closeSession = () => {
    if (role !== "tutor") return;

    const storedSessionId = localStorage.getItem("sessionId");
    if (!storedSessionId) return;

    const url = `${process.env.REACT_APP_API_BASE_URL}/groups/sessions/${storedSessionId}/close`;

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([], { type: "application/json" }));
    } else {
      try {
        axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/groups/sessions/${storedSessionId}/close`
        );
        localStorage.removeItem("sessionId");
      } catch (error) {
        console.error("Erreur lors de la fermeture de la session :", error);
      }
    }

    localStorage.removeItem("sessionId");
  };


  useEffect(() => {
    const domain = "meet.edixacademy.com"; 
    const options = {
      roomName: bookingId,
      parentNode: containerRef.current,
      userInfo: { displayName: userName },
      configOverwrite: {},
      interfaceConfigOverwrite: {},
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    apiRef.current = api;

    api.addListener("readyToClose", () => {
      console.log("Jitsi meeting ended");
      closeSession();
    });

    return () => {
      closeSession();
      api.dispose();
    };
  }, [bookingId, role, userName]);

  useEffect(() => {
    const handleUnload = () => closeSession();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [role]);

  return <div ref={containerRef} style={{ height: "600px", width: "100%" }} />;
};

export default JitsiMeeting;
