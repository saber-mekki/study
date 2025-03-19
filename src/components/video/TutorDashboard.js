import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_API_URL}`);
const peerConnections = {}; 

const TutorLiveSession = () => {
  const [roomCode, setRoomCode] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const myVideo = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    socket.on("student-joined", async ({ studentId }) => {
      console.log("Student joined:", studentId);
      await createPeerConnection(studentId);
    });

    return () => {
      socket.off("student-joined");
    };
  }, []);

  const startSession = async () => {
    const tutorId = "141bb681-2ed1-4c53-a7af-a01772e06bb0";
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorId }),
      });

      const data = await response.json();
      if (!data.roomId) throw new Error("Room ID not found in response");

      setRoomCode(data.roomId);
      setSessionStarted(true);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
      streamRef.current = stream;

      socket.emit("join-room", { room: data.roomId, role: "tutor" });
    } catch (error) {
      console.error("Failed to start session:", error);
      alert("Error starting session. Please try again.");
    }
  };

  const createPeerConnection = async (studentId) => {
    const peerConnection = new RTCPeerConnection();
    peerConnections[studentId] = peerConnection;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, streamRef.current);
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Tutor ICE Candidate:", event.candidate);
        socket.emit("ice-candidate", { candidate: event.candidate, to: studentId });
      }
    };

    const offer = await peerConnection.createOffer();
    console.log("Tutor Offer:", offer);
    await peerConnection.setLocalDescription(offer);
    console.log("📡 Tutor Sending Offer to:", studentId, offer);
    socket.emit("send-offer", { offer, to: studentId });

    socket.on("receive-answer", async ({ answer }) => {
      console.log("Tutor Received Answer:", answer);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", ({ candidate }) => {
      console.log("Tutor Received ICE Candidate:", candidate);
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  return (
    <div>
      <h2>Tutor Live Session</h2>
      {!sessionStarted ? (
        <button onClick={startSession}>Start Session</button>
      ) : (
        <>
          <p>Share this code with the student: <strong>{roomCode}</strong></p>
          <video ref={myVideo} autoPlay playsInline muted />
        </>
      )}
    </div>
  );
};

export default TutorLiveSession;