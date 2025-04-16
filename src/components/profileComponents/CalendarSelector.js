import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

 import { useSelector } from "react-redux";

import CalendarBooking from './CalendarBooking'

import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css'; 

export default function TutorAvailabilityManager() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [status, setStatus] = useState('available');
    const user = useSelector((state) => state.user);
  const tutorId = user.idUser;
  useEffect(() => {
    if(user.idUser !== undefined ){
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/${user.idUser}`);
        setAvailability(response.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };
    fetchAvailability();
  }
  }, [user]);

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
          tutor_id: parseInt(tutorId),
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
            <select onChange={(e) => setStatus(e.target.value)} value={status}>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <button onClick={handleUpdateStatus}>Update</button>
            <button onClick={handleRemoveAvailability}>Remove</button>
          </div>
        </div>
      )}
      <CalendarBooking studentId="0" tutorId={tutorId} />
    </div>
  );
}
