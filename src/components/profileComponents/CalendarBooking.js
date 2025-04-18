import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import 'react-calendar/dist/Calendar.css';

export default function CalendarBooking({ tutorId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
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
        selectedDate: selectedDate.toISOString().split('T')[0],
        name: user.name,
        message,
      });
      alert('Date booked!');
      setMessage('');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Error booking date');
    }
  };

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={({ date }) =>
          !availableDates.some((d) => d.toDateString() === date.toDateString())
        }
      />
         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <textarea
          name="message"
          placeholder="Write your message to the tutor"
          rows={4}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            resize: 'none',
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={handleSubmit} disabled={!selectedDate || !message.trim()}
        >
          Send Booking Request
        </button>
      </div>
     
    </div>
  );
}
