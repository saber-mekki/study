import React, { useEffect, useState } from 'react';
import axios from "axios";
import CalendarBooking from '../profileComponents/CalendarBooking';
import { Link } from "react-router-dom";
import {
  Rating,
} from '@mui/material';
import { useTranslation } from "react-i18next";

export default function TutorCard({
  specialty,
  country,
  price,
  languages,
  rating = 4.3,
  name,
  image,
  bio,
  id
}) {
   const { t } = useTranslation();
  const [averageRating, setAverageRating] = useState(null);

  const [TutorDetails, setTutorDetails] = useState(false)
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleOpenTutorDetails = () => {
    setTutorDetails(true)

  }

  const handleClose = () => {
    setTutorDetails(false);
  };


  useEffect(() => {
    const fetchRating = () => {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/rating/${id}`)
        .then((res) => {
          setAverageRating(Number(res.data.average_rating));

        })
        .catch((err) => {
          console.error("Error fetching tutor rating", err);
        })

    };
    fetchRating();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`)
            .then((response) => {
              setImageUrl(response.data[response.data.length - 1].image_url)
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
        }

      } catch (err) {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred while fetching user data.");
        }
      }
    };

    fetchUserData();
  }, [id]);



  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center" >
      <div onClick={handleOpenTutorDetails} className="card shadow-sm border-0 rounded-4 p-4 position-relative text-center Mycard h-100">
        <div className="d-flex justify-content-center mb-3">
          {error ? <div className="text-danger">{error}</div> : <img
            src={imageUrl || "/assets/images/tutorprofil.png"}
            alt={`${name} profile`}
            className="rounded-circle shadow "
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '4px solid #f0f0f0',
            }}
          />}
        </div>
        <span style={{ textTransform: 'capitalize', color: '#03045e' }}

          className="fw-bold h3  mb-1 ">{name}</span>

        <p className="text-secondary h4 small mb-3 px-2">{bio}</p>
        <p style={{ color: '#000814' }} className=" h3 small mb-1">{specialty}</p>
        <p style={{ color: "#168aad " }} className=" h4 small mb-2">
          <i className="fas fa-map-marker-alt me-1 " /> {country}
        </p>


        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
          <div className="text-warning">

            <Rating
              value={averageRating || 0}
              precision={0.5}
              readOnly
              size="medium"
            />
          </div>
          <div>
            <span className="text-success h4 fw-bold">${price}</span>
          </div>
        </div>
      </div>

      {TutorDetails && (
        <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1" role="dialog" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-xl	 modal-dialog-centered" role="document">
            <div className="modal-content rounded-4 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{name}{t("'s Profile")}:</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="d-flex flex-row gap-4 align-items-start">



                <div className="modal-body p-4 my-5 d-flex gap-4">
                  <div className="row  g-4">
                    <div className="col-md-4 text-center">
                      {error ? <div className="text-danger">{error}</div> : <Link to={`/user/${id}`}><img
                        src={imageUrl || "/assets/images/tutorprofil.png"}
                        alt={name}
                        className="rounded-circle shadow"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      /></Link>}

                      <Link to={`/user/${id}`}>    <h5 className="mt-3 fw-bold">{name}</h5></Link>
                      <p className="text-muted">{specialty}</p>
                      <p><i className="fas fa-map-marker-alt text-danger me-1" />{country}</p>
                    </div>

                    <div className="col-md-8  p-2">
                      <p className="text-muted"><strong>{t("Bio")}:</strong> {bio}</p>
                      <p className="text-muted"><strong>{t("Languages")}:</strong> {languages?.join(', ') || 'Not specified'}</p>


                      <p className="text-muted"><strong>{t("Price")}:</strong> <span className="text-success">${price} / session</span></p>
                      <Rating
                        value={averageRating || 0}
                        precision={0.5}
                        readOnly
                        size="medium"
                      />
                    </div>
                  </div>
                </div>
                <CalendarBooking tutorId={id} />

              </div>

              <div className="modal-footer bg-light">

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
