import { useState } from "react";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFileUrl(data.fileUrl);
        alert("Upload réussi !");
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      alert("Échec de l'upload.");
    }

    setUploading(false);
  };

  return (
    <div>
      <h2>Uploader une Vidéo</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Upload en cours..." : "Uploader"}
      </button>

      {fileUrl && (
        <div>
          <h3>Vidéo Uploadée :</h3>
          <video controls width="500">
            <source src={fileUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
