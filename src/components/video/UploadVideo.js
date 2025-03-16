import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) {
      setMessage("Select a video first!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/video-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Uploading: {progress}%</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoUpload;
