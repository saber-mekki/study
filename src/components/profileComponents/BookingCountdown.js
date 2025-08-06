import React, { useState, useEffect } from "react";

export const BookingCountdown = ({ bookingDate }) => {
    const getTimeRemaining = (targetDate) => {
        const total = new Date(targetDate) - new Date();
        if (total <= 0) return null;
    
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
        return { total, days, hours, minutes, seconds };
      };
    
      const [timeLeft, setTimeLeft] = useState(getTimeRemaining(bookingDate));
    
      useEffect(() => {
        const interval = setInterval(() => {
          setTimeLeft(getTimeRemaining(bookingDate));
        }, 1000);
    
        return () => clearInterval(interval);
      }, [bookingDate]);
    
      if (!timeLeft) {
        return <span className="text-red-600 font-semibold">Session expirée</span>;
      }
    
      const { days, hours, minutes, seconds } = timeLeft;
    
      // 💡 Déterminer la classe couleur selon le temps restant
      let colorClass = "text-green-600";
      if (days === 0 && hours === 0 && minutes < 5) {
        colorClass = "text-yellow-500";
      }
    
      return (
        <span className={`${colorClass} font-medium`}>
          Commence dans :{" "}
          {days > 0 ? `${days}j ` : ""}
          {hours > 0 || days > 0 ? `${hours}h ` : ""}
          {minutes}m {seconds}s
        </span>
      );
    };
    