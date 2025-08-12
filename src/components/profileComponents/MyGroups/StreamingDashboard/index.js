import React from "react";
// import HeaderOne from "../../layouts/HeaderOne";
import { useParams } from "react-router-dom";
import JitsiMeeting from "./JitsiMeeting";

function StreamingDashboard() {
  const role = localStorage.getItem("role");
  const { roomId } = useParams()
  const userName = localStorage.getItem("userName") || "Invité";

  return (
    <>
     <style jsx>
      {`
        .streaming-dashboard {
          background: #f7f9fc;
          padding: 40px 20px;
          font-family: 'Segoe UI', sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h1 {
          font-size: 2.8rem;
          color: #34495e;
        }

        .header p {
          color: #555;
          font-size: 1.2rem;
          margin-top: 10px;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 40px;
        }

        .large-card {
          width: 100%;
        }

        .card h2 {
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 25px;
        }

        /* Ajustement pour la vidéo si tu l'affiches dans TutorDashboard */
        video {
          width: 100% !important;
          max-height: 550px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* <HeaderOne /> */}
        <header className="header">
          <h1> Espace de Streaming en Direct</h1>

          {role === "tutor"
            ? "Créez une session en direct pour vos apprenants."
            : "Rejoignez une session en direct avec un code fourni par votre tuteur."}

        </header>
         <div className="container mt-4">
       <h2> Vous êtes connecté à la session</h2>
       <p className="text-muted">Session interactive avec votre tuteur</p>
 
       <JitsiMeeting  role={role} userName={userName} bookingId={roomId}/>
     </div>
    </>
  );
}
export default StreamingDashboard;
