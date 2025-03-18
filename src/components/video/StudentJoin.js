import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const peerConnection = new RTCPeerConnection();

const StudentLiveSession = () => {
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  const tutorVideo = useRef(null);

  useEffect(() => {
    socket.on("receive-offer", async ({ offer, from }) => {
      console.log("🔴 Student Received Offer:", offer, "from:", from);
      
      if (!offer) {
        console.error("No offer received");
        return;
      }

      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("send-answer", { answer, to: from });

      console.log("✅ Student Sent Answer:", answer);
    });

    peerConnection.ontrack = (event) => {
      console.log("🎥 Student Received Video Track:", event.streams[0]);
      if (tutorVideo.current) {
        tutorVideo.current.srcObject = event.streams[0];
      }
    };

    socket.on("ice-candidate", ({ candidate }) => {
      console.log("❄️ Student Received ICE Candidate:", candidate);
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.off("receive-offer");
      socket.off("ice-candidate");
    };
  }, []);

  const joinSession = () => {
    console.log("🔵 Joining room:", roomCode);
    socket.emit("join-room", { room: roomCode, role: "student" });
    setJoined(true);
  };

  return (
    <div>
      <h2>Student Live Session</h2>
      {!joined ? (
        <>
          <input
            type="text"
            placeholder="Enter invite code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={joinSession}>Join Session</button>
        </>
      ) : (
        <video ref={tutorVideo} autoPlay playsInline />
      )}
    </div>
  );
};

export default StudentLiveSession;
