import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useSelector } from "react-redux";
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css'; 

export default function TutorAvailabilityManager() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [status, setStatus] = useState('available');
  const [pendingBookings, setPendingBookings] = useState([]);

  const user = useSelector((state) => state.user);
  const tutorId = user.idUser;

  useEffect(() => {
    if (!tutorId) return;

    const fetchData = async () => {
      try {
        const [availabilityRes, bookingsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/${tutorId}`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/tutor/booking-requests/${tutorId}`),
        ]);
        setAvailability(availabilityRes.data);
        setPendingBookings(bookingsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tutorId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddAvailability = async () => {
    if (selectedDate) {
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability`, {
          tutorId,
          availableDate: selectedDate.toISOString().split('T')[0],
        });
        alert('Availability added');
        setAvailability([...availability, {
          tutor_id: tutorId,
          available_date: selectedDate.toISOString(),
          status: 'available'
        }]);
      } catch (error) {
        alert('Error adding availability');
      }
    }
  };

  const handleUpdateStatus = async () => {
    if (selectedDate) {
      try {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/update`, {
          tutorId,
          availableDate: selectedDate.toISOString().split('T')[0],
          status,
        });
        alert('Status updated');
        setAvailability((prev) =>
          prev.map((item) =>
            new Date(item.available_date).toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]
              ? { ...item, status }
              : item
          )
        );
      } catch (error) {
        alert('Error updating status');
      }
    }
  };

  const handleRemoveAvailability = async () => {
    if (selectedDate) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/remove`, {
          data: {
            tutorId,
            availableDate: selectedDate.toISOString().split('T')[0],
          },
        });
        alert('Availability removed');
        setAvailability((prev) =>
          prev.filter(
            (item) =>
              new Date(item.available_date).toISOString().split('T')[0] !== selectedDate.toISOString().split('T')[0]
          )
        );
      } catch (error) {
        alert('Error removing availability');
      }
    }
  };

  const handleAccept = async (bookingId, date) => {
   
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tutor/booking-requests/accept`, { bookingId });
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/update`, {
        tutorId,
        availableDate: date,
        status: 'booked',
      });
      alert('Booking accepted');
      setPendingBookings((prev) => prev.filter(b => b.id !== bookingId));
      setAvailability((prev) =>
        prev.map((item) =>
          new Date(item.available_date).toISOString().split('T')[0] === date
            ? { ...item, status: 'booked' }
            : item
        )
      );
    } catch (error) {
      alert('Error accepting booking');
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tutor/booking-requests/decline`, { bookingId });
      alert('Booking declined');
      setPendingBookings((prev) => prev.filter(b => b.id !== bookingId));
    } catch (error) {
      alert('Error declining booking');
    }
  };

  const getStatus = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const found = availability.find((item) => {
      const itemDateStr = new Date(item.available_date).toISOString().split('T')[0];
      return itemDateStr === dateStr;
    });
    return found ? found.status : null;
  };

  const tileClassName = ({ date }) => {
    const status = getStatus(date);
    if (status === 'available') return 'available';
    if (status === 'booked') return 'booked';
    if (status === 'unavailable') return 'unavailable';
    return null;
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Manage Tutor Availability</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Date: {selectedDate.toDateString()}</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={handleAddAvailability}>Add</button>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              style={{
                borderRadius: '8px',
                padding: '6px 10px',
                border: '1px solid #ccc',
                zIndex: 1,
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <button onClick={handleUpdateStatus}>Update</button>
            <button onClick={handleRemoveAvailability}>Remove</button>
          </div>
        </div>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
  {pendingBookings.map((request) => (
    <li
      key={request.id}
      style={{
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>
        📅 {new Date(request.booking_date).toLocaleDateString()}
      </div>
      <div style={{ fontSize: '15px', color: '#333' }}>
        <strong>👤 {request.name}</strong>
      </div>
      <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>
        📝 {request.message}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <button
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleAccept(request.id, request.booking_date)}
        >
          Accept
        </button>
        <button
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: '#F44336',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleDecline(request.id)}
        >
          Decline
        </button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}
