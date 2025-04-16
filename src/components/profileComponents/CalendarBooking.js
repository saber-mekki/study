import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Calendar from 'react-calendar';

import { useSelector } from "react-redux";

export default function CalendarBooking({  tutorId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
 const user = useSelector((state) => state.user);
  useEffect(() => {
    if(tutorId !== undefined){ axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/${tutorId}`)
      .then((res) => {

      /*eslint-disable*/
        setAvailableDates(res.data.map((item) =>{if(item.status==="available") return  new Date(item.available_date)}));
      });}
   
  }, [tutorId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;

    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/book`, {
      studentId:user.idUser,
      tutorId,
      selectedDate: selectedDate.toISOString().split('T')[0],
    });
    alert('Date booked!');
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={({ date }) =>
          !availableDates.find((d) =>d!==undefined && d.toDateString() === date.toDateString())
        }
      />
      <button onClick={handleSubmit} disabled={!selectedDate}>
        Book Date
      </button>
    </div>
  );
}
