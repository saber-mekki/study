import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const peerConnections = {};

const TutorLiveSession = () => {
  const [roomCode, setRoomCode] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [joinedStudents, setJoinedStudents] = useState([]);
  const [socket, setSocket] = useState(null);
  const myVideo = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_URL}`);
    setSocket(newSocket);

    newSocket.on("student-joined", async ({ studentId }) => {
      console.log("Student joined:", studentId);
      setJoinedStudents((prev) => [...new Set([...prev, studentId])]);
      await createPeerConnection(studentId, newSocket);
    });

    return () => {
      newSocket.off("student-joined");
      newSocket.disconnect();
      console.log("Socket disconnected from Tutor Page");
    };
  }, []);

  const startSession = async () => {
    const tutorId = "1802d115-3a59-420a-abc2-4f2a262454629";
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorId }),
      });

      const data = await response.json();
      if (!data.roomId) throw new Error("Room ID not found");

      setRoomCode(data.roomId);
      setSessionStarted(true);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
      streamRef.current = stream;

      socket?.emit("join-room", { room: data.roomId, role: "tutor" });
    } catch (error) {
  console.error("Failed to start session:", error);
  if (error.response) {
    console.log("Backend response:", error.response.data);
    alert(`Backend error: ${error.response.data.message || JSON.stringify(error.response.data)}`);
  } else {
    alert(`Error: ${error.message}`);
  }
}
  };

  const endSession = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    Object.values(peerConnections).forEach((pc) => pc.close());
    socket?.disconnect();
    setSessionStarted(false);
    setJoinedStudents([]);
    alert("Session terminée.");
  };

  const createPeerConnection = async (studentId, socket) => {
    const peerConnection = new RTCPeerConnection();
    peerConnections[studentId] = peerConnection;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        peerConnection.addTrack(track, streamRef.current);
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, to: studentId });
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("send-offer", { offer, to: studentId });

    socket.on("receive-answer", async ({ answer }) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", ({ candidate }) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;
    recordedChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      await uploadVideo(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const uploadVideo = async (videoBlob) => {
    try {
      const tutorId = "141bb681-2ed1-4c53-a7af-a01772e06bb0";
      const formData = new FormData();
      formData.append("video", videoBlob, "session-recording.webm");
      formData.append("tutorId", tutorId);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload-video`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Video uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading video");
    }
  };

  return (
    <div style={{ display: "flex", gap: "30px", padding: "30px", alignItems: "flex-start" }}>
      {/* Zone vidéo et session */}
      <div style={{ flex: 1 }}>
        <h2>Tutor Live Session</h2>

        {!sessionStarted ? (
<button onClick={startSession} className="btn btn-primary">
  Start Session
</button>
        ) : (
          <>
            <p>
              Code de session :{" "}
              <strong>{roomCode}</strong>
            </p>
            <video
              ref={myVideo}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            />
            <div style={{ marginTop: "10px" }}>
              {!isRecording ? (
                <button onClick={startRecording}>Start Recording</button>
              ) : (
                <button onClick={stopRecording}>Stop Recording</button>
              )}
              <button
                onClick={endSession}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                End Session
              </button>
            </div>
          </>
        )}
      </div>

      {/* Zone étudiants connectés à droite */}
      {sessionStarted && (
        <div
          style={{
            width: "300px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>👥 Étudiants connectés</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {joinedStudents.length === 0 ? (
              <li style={{ color: "#888" }}>Aucun étudiant connecté</li>
            ) : (
              joinedStudents.map((id, idx) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    fontSize: "14px",
                    color: "#34495e",
                    fontWeight: "500",
                  }}
                >
                  👤 {id}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TutorLiveSession;
