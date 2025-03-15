import { useEffect, useState } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/videos`) 
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Erreur chargement vidéos", error));
  }, []);

  return (
    <div>
      <h2>Vidéos disponibles</h2>
      {videos.length === 0 ? <p>Aucune vidéo disponible.</p> : null}
      {videos.map((videoUrl, index) => (
        <div key={index}>
          <video controls width="500">
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
