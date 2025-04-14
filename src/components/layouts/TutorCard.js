import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function TutorCard({
  specialty,
  country,
  price,
  languages,
  rating = 4.3,
  name,
  image,
  bio,
}) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 ">
      <div className="card shadow-sm border-0 rounded-4 p-4 position-relative text-center Mycard h-100">
        <div className="d-flex justify-content-center mb-3">
          <img
            src={/* image || */ "/assets/images/profile.jpeg"}
            alt={`${name} profile`}
            className="rounded-circle shadow "
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '4px solid #f0f0f0',
            }}
          />
        </div>

        <h5 className="fw-bold h2  mb-1 Mycard-title">{name}</h5>
        <p style={{color:'#000814'}} className=" h3 small mb-1">{specialty}</p>
        <p style={{color:"#168aad "}} className=" h4 small mb-2">
          <i  className="fas fa-map-marker-alt me-1 " /> {country}
        </p>

        <p className="text-secondary h4 small mb-3 px-2">{bio}</p>

        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
          <div className="text-warning">
            <i className="fas fa-star" /> <span className="fw-bold">{rating}</span>
          </div>
          <div>
            <span className="text-success h4 fw-bold">${price}</span>
          </div>
        </div>

        <div className="mt-3">
          <Link
            to="#"
            className="btn btn-primary btn-sm rounded-pill px-4"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
