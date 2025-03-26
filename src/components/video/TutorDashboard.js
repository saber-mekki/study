import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

const peerConnections = {}; // Store peer connections

const TutorLiveSession = () => {
  const [roomCode, setRoomCode] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
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
      await createPeerConnection(studentId, newSocket);
    });

    return () => {
      newSocket.off("student-joined");
      newSocket.disconnect();
      console.log("Socket disconnected from Tutor Page");
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

      socket?.emit("join-room", { room: data.roomId, role: "tutor" });
    } catch (error) {
      console.error("Failed to start session:", error);
      alert("Error starting session. Please try again.");
    }
  };

  const createPeerConnection = async (studentId, socket) => {
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
    console.log("Recording started...");
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Recording stopped...");
    }
  };

  const uploadVideo = async (videoBlob) => {
    try {
      const tutorId = "141bb681-2ed1-4c53-a7af-a01772e06bb0";
      const formData = new FormData();
      formData.append("video", videoBlob, "session-recording.webm");
    formData.append("tutorId", tutorId);

    // Debugging: Check FormData values
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload-video`, {
        method: "POST",
        body: formData ,
      });

      const data = await response.json();
      if (data.success) {
        alert("Video uploaded successfully!");
        console.log("Uploaded Video URL:", data.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading video");
    }
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
          <br />
          {!isRecording ? (
            <button onClick={startRecording}>Start Recording</button>
          ) : (
            <button onClick={stopRecording}>Stop Recording</button>
          )}
        </>
      )}
    </div>
  );
};

export default TutorLiveSession;
