import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function DateListBooking({ tutorId }) {
  const { t } = useTranslation();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (tutorId) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/${tutorId}`)
        .then((res) => {
          const dates = res.data
            .filter((item) => item.status === 'available')
            .map((item) => new Date(item.available_date));
          setAvailableDates(dates);
        });
    }
  }, [tutorId]);

  const handleSubmit = async () => {
    if (!selectedDate) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/book`, {
        studentId: user.idUser,
        tutorId,
        selectedDate:selectedDate.toLocaleString('sv-SE'),
        name: user.name,
        message,
      });
          toast.success('Date booked!');  
      setMessage('');
      setSelectedDate(null);
    } catch (err) {
      console.error('Booking error:', err);
         toast.error('Error booking date');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }}>{t("Choose an available slot")}</h3>

      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '12px',
        }}
      >
        {availableDates.length === 0 ? (
          <p>{t("No available slots")}</p>
        ) : (
          availableDates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: selectedDate === date ? '#1976d2' : '#f9f9f9',
                color: selectedDate === date ? '#fff' : '#000',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: '8px',
                fontWeight: '500',
              }}
            >
              {date.toLocaleString('fr-FR', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </button>
          ))
        )}
      </div>

      <textarea
        name="message"
        placeholder="Write your message to the tutor"
        rows={4}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px',
          width: '100%',
          resize: 'none',
          marginBottom: '12px',
        }}
      ></textarea>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!selectedDate || !message.trim()}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {t("Send Booking Request")}
      </button>
    </div>
  );
}
