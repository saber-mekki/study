import React from 'react'

export default function Account() {
  return (
    <div>
    <h6 className="mb-2 text-primary">Personal Details</h6>
    <div className="row gutters">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter full name"
                />
            </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
                <label htmlFor="eMail">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="eMail"
                    placeholder="Enter email ID"
                />
            </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone number"
                />
            </div>
        </div>
       
    </div>
</div>  )
}
