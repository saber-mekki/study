import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Status() {
  const [status, setstatus] = useState();
  const [rejected, setrejected] = useState(false);

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/status`, {
        id: userId,
        status: "aproved",
      });
      setstatus(response.data.status);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/showStatus`,
            {
              id: userId,
            }
          );
          setstatus(response.data.status);
          if (status === "rejected") {
            localStorage.removeItem("authToken");
            Cookies.remove("role");
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/deleteUser`, {
              id: userId,
            });
            setrejected(true);
          }
        } catch (error) {}
      }
    };
    fetchStatus();
  }, []);

  return (
    <>
    
      {status === "waiting" && (
        <div className="w-full bg-warning border-b border-yellow-400 text-black text-sm text-center py-2 px-3">
          ⏳ Your account is currently under review. We will notify you once the
          verification is complete. Thank you for your patience!
        </div>
      )}

      {rejected && (
        <div
          className="modal fade show d-flex align-items-center justify-content-center"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "flex",
            backgroundColor: "rgba(0,0,0,0.7)",
            height: "100vh",
            zIndex: 1040,
          }}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            role="document"
            style={{
              maxWidth: "80%",
              width: "80%",
              maxHeight: "80vh",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="modal-content rounded-4 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Rejection</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ color: "white" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="w-full bg-light border h2 border-info text-dark text-center py-3 px-4">
                  <div>❌</div>
                  <strong>
                    {" "}
                    Unfortunately, your account request has been rejected. If
                    you believe this is a mistake, please contact our support
                    team for assistance.
                  </strong>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-center">
              <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "accepted" && (
        <div className="w-full bg-success border-b border-yellow-400 text-black text-sm text-center py-2 px-4">
          🎉 Congratulations! Your account has been approved. You can now start
          using all the features of the platform. shortly.
          <button onClick={handleAccept} type="button" class="btn btn-link">
            Approve
          </button>
        </div>
      )}
    </>
  );
}
