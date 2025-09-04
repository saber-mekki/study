import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

export default function VerifyAccount() {
  const [status, setStatus] = useState("Verifying...");
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/verify?token=${token}`)
        .then(() => {
          setStatus("✅ Your email has been verified! Redirecting to login...");
          setTimeout(() => history.push("/login"), 3000); // redirect after 3s
        })
        .catch(() => {
          setStatus("❌ Verification link is invalid or expired.");
        });
    } else {
      setStatus("❌ No token provided.");
    }
  }, [token, history]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2>{status}</h2>
    </div>
  );
}
