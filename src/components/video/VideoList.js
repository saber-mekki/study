import { useEffect, useState } from "react";
import axios from "axios";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user-videos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVideos(response.data.videos);
    
  };

  useEffect(() => {
    fetchVideos()
  }, []);

  return (
    <div>
      <h2>Vidéos disponibles</h2>
      {videos.length === 0 ? <p>Aucune vidéo disponible.</p> : null}
      {videos.map((video, index) => (
        <div key={index}>
          <video controls width="500">
          <source src={video.video_url} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;


