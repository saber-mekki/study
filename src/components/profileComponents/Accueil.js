import React, { useState, useCallback,useEffect } from "react";
import Cropper from "react-easy-crop";
import { FaCamera } from "react-icons/fa";

import { useSelector } from "react-redux";


export default function Accueil({ image,email }) {
 
   const user = useSelector((state) => state.user);

  const [profileImage, setProfileImage] = useState(image);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lengthMin, setlengthMin] = useState(false);

  const [bio, setBio] = useState("Hi, I'm " + user.name + " i love EduSkills");
  useEffect(() => {
    if (user.name) {
      setBio(`Hi, I'm ${user.name} i love EduSkills`);
    }
    
  }, [user.name]);
  
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveClick = () => {
    if (bio.length < 20) {
      setlengthMin(true);
      return;
    }
    setIsEditing(false);
    setlengthMin(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsCropping(true);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImage(
        selectedImage,
        croppedAreaPixels
      );
      setProfileImage(croppedImage);
      setIsCropping(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Cropping failed:", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSaveClick();
    } else if (event.key === "Escape") {
      handleEditClick();
    }
  };

  return (
    <div className="text-center">
      <div className="position-relative d-inline-block">
        <label htmlFor="imageUpload">
          <img
            tabIndex="-1"
            src={profileImage}
            alt="Profile"
            className="rounded-circle p-1 bg-primary "
            width="80"
            style={{ cursor: "pointer" }}
          />
          <div
            className="position-absolute d-flex align-items-center justify-content-center rounded-circle border-2"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#d6ccc2",
              bottom: "5px",
              right: "5px",
              cursor: "pointer",
            }}
          >
            <FaCamera style={{ color: "blue", fontSize: "14px" }} />
          </div>
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="mt-0">
        <h4>{user.name}</h4>
        <h4>{email}</h4>
        <h4>{user.role}</h4>

        <div
          className="bio-section w-50 mt-2 p-1  rounded shadow-sm mx-auto"
          style={{ backgroundColor: "#f1faee" }}
        >
          <h4 className="text-primary mb-3">Bio</h4>
          {lengthMin && (
            <small className="text-danger">
              Bio Length must be more than 20 characters
            </small>
          )}
          {isEditing ? (
            <div>
              <textarea
                value={bio}
                onChange={handleChange}
                className="form-control mb-2"
                rows="5"
                maxLength="100"
                onKeyDown={handleKeyDown}
                minLength="5"
              />
              <div className="d-flex justify-content-around mt-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleSaveClick}
                >
                  Save Bio
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleEditClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-muted mb-2 text-center">{bio}</p>
          )}
          {!isEditing && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handleEditClick}
            >
              Edit Bio
            </button>
          )}
        </div>
      </div>

      {isCropping && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            width: "400px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              background: "#f0f0f0",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1} // Keep a square aspect ratio
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "200px",
                height: "200px",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: "2px solid rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              className="btn btn-success btn-sm"
              onClick={handleCropConfirm}
            >
              Confirm
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setIsCropping(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

async function getCroppedImage(imageSrc, cropArea) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = cropArea.width;
  canvas.height = cropArea.height;

  ctx.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}
