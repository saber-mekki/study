import React from 'react'

export default function Settings() {
  return (
<div>
                                    <h6 className="mb-2 text-primary">Settings</h6>
                                    <div className="row gutters">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="language">Language</label>
                                                <select className="form-control" id="language">
                                                    <option value="english">English</option>
                                                    <option value="french">French</option>
                                                    <option value="german">German</option>
                                                    <option value="arabic">Arabic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>  )
}
