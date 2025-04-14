import React, { useState } from 'react';
import CalendarBooking from '../profileComponents/CalendarBooking';

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
}) 


{
  const [TutorDetails, setTutorDetails] = useState(false)

  const handleOpenTutorDetails=()=>{
    setTutorDetails(true)

  }
  const handleClose = () => {
    setTutorDetails(false);
  };
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 " >
      <div onClick={handleOpenTutorDetails} className="card shadow-sm border-0 rounded-4 p-4 position-relative text-center Mycard h-100">
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

        <span style={{ textTransform: 'capitalize', color: '#03045e' }}
          className="fw-bold h3  mb-1 ">{name}</span>
        <p style={{ color: '#000814' }} className=" h3 small mb-1">{specialty}</p>
        <p style={{ color: "#168aad " }} className=" h4 small mb-2">
          <i className="fas fa-map-marker-alt me-1 " /> {country}
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

     
      </div>

      {TutorDetails && (
  <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1" role="dialog" style={{ display: 'flex', backgroundColor: 'rgba(0,0,0,0.7)' }}>
    <div className="modal-dialog modal-xl	 modal-dialog-centered" role="document">
      <div className="modal-content rounded-4 shadow-lg">
      <div className="modal-header bg-primary text-white">
           <h5 className="modal-title">{name}'s Profile</h5>
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
               <img
                 src={image || "/assets/images/profile.jpeg"}
                 alt={name}
                 className="rounded-circle shadow"
                 style={{ width: '120px', height: '120px', objectFit: 'cover' }}
               />
               <h5 className="mt-3 fw-bold">{name}</h5>
               <p className="text-muted">{specialty}</p>
               <p><i className="fas fa-map-marker-alt text-danger me-1" />{country}</p>
             </div>
        
             <div className="col-md-8  p-2">
               <p className="text-muted"><strong>Bio:</strong> {bio}</p>
               <p className="text-muted"><strong>Languages:</strong> {languages?.join(', ') || 'Not specified'}</p>
               <p className="text-muted"><strong>Rating:</strong> <i className="fas fa-star text-warning" /> {rating}</p>
               <p className="text-muted"><strong>Price:</strong> <span className="text-success">${price} / session</span></p>
             </div>
           </div>
         </div>
         <CalendarBooking tutorId={id}/>
        
       </div>

        <div className="modal-footer bg-light">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose} 
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
          >
            Book for ${price}
          </button>

        </div>
        
      </div>
    </div>
  </div>
)}
   
   
   
   
   
   
    </div>
  );
}
