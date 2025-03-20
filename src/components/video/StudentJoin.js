import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const StudentLiveSession = () => {
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const tutorVideo = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_URL}`);
    setSocket(newSocket);

    newSocket.on("receive-offer", async ({ offer, from }) => {
      console.log("🔴 Student Received Offer:", offer, "from:", from);

      if (!offer) {
        console.error("No offer received");
        return;
      }

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      newSocket.emit("send-answer", { answer, to: from });

      console.log("✅ Student Sent Answer:", answer);
    });

    peerConnection.current.ontrack = (event) => {
      console.log("🎥 Student Received Video Track:", event.streams[0]);
      if (tutorVideo.current) {
        tutorVideo.current.srcObject = event.streams[0];
      }
    };

    newSocket.on("ice-candidate", ({ candidate }) => {
      console.log("❄️ Student Received ICE Candidate:", candidate);
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      newSocket.off("receive-offer");
      newSocket.off("ice-candidate");
      newSocket.disconnect();
      console.log("Socket disconnected from Student Page");
    };
  }, []);

  const joinSession = () => {
    console.log("🔵 Joining room:", roomCode);
    socket?.emit("join-room", { room: roomCode, role: "student" });
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
