import React from "react";
import HeaderOne from "../layouts/HeaderOne";
import StudentJoin from "./StudentJoin";
import TutorDashboard from "./TutorDashboard"; // Assume this handles creating a session

function StreamingDashboard() {
  const role = localStorage.getItem("role");

  return (
    <>
      <HeaderOne />
      <div className="streaming-dashboard">
        <header className="header">
          <h1>📡 Espace de Streaming en Direct</h1>

          {role === "tutor"
            ? "Créez une session en direct pour vos apprenants."
            : "Rejoignez une session en direct avec un code fourni par votre tuteur."}

        </header>

        <main className="main-content">
          {role === "tutor" && (
            <section className="card d-flex justify-content-center align-items-center  large-card">
              <h2>🎥 Créer une session en direct</h2>
              <TutorDashboard />
            </section>
          )}

          {role === "student" && (
            <section className="card large-card">
              <h2>🔗 Rejoindre une session en direct</h2>
              <StudentJoin />
            </section>
          )}
        </main>
      </div>

      <style jsx>{`
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
    </>
  );
}

export default StreamingDashboard;
