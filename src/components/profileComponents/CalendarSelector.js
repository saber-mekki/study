import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from "react-i18next";



export default function TutorAvailabilityManager() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [status, setStatus] = useState('available');
  const [pendingBookings, setPendingBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = pendingBookings.slice(indexOfFirstBooking, indexOfLastBooking);
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
availableDate: selectedDate.toLocaleDateString('en-CA') 
        });
        toast.success(t('Availability added'));
        setAvailability([...availability, {
          tutor_id: tutorId,
          available_date: selectedDate.toISOString(),
          status: 'available'
        }]);
      } catch (error) {

        toast.error(t('Error adding availability'));
      }
    }
  };


  const handleUpdateStatus = async () => {
    if (selectedDate) {
      try {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/update`, {
          tutorId,
          availableDate: selectedDate.toLocaleDateString('en-CA'),
        });

        toast.success(t('Status updated'));
        setAvailability((prev) =>
          prev.map((item) =>
            new Date(item.available_date).toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]
              ? { ...item, status }
              : item
          )
        );
      } catch (error) {
        toast.error(t('Error updating status'));
      }
    }
  };

  const handleRemoveAvailability = async () => {
    if (selectedDate) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tutor/availability/remove`, {
          data: {
            tutorId,
            availableDate: selectedDate.toLocaleDateString('en-CA'), // 'YYYY-MM-DD'
          },
        });


        toast.success(t('availability_removed'));

        setAvailability((prev) =>
          prev.filter(
            (item) =>
              new Date(item.available_date).toISOString().split('T')[0] !== selectedDate.toISOString().split('T')[0]
          )
        );
      } catch (error) {
        toast.error(t('Error removing availability'));
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

      toast.success(t('Booking accepted'));
      setPendingBookings((prev) => prev.filter(b => b.id !== bookingId));
      setAvailability((prev) =>
        prev.map((item) =>
          new Date(item.available_date).toLocaleDateString('en-CA') === new Date(date).toLocaleDateString('en-CA')
            ? { ...item, status: 'booked' }
            : item
        )
      );
    } catch (error) {
      toast.error(t('Error accepting booking'));
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tutor/booking-requests/decline`, { bookingId });

      toast.success(t('Booking declined'));
      setPendingBookings((prev) => prev.filter(b => b.id !== bookingId));
    } catch (error) {

      toast.error(t('Error declining booking'));
    }
  };

  const getStatus = (date) => {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const found = availability.find((item) => {
      const itemDateStr = new Date(item.available_date).toISOString().split('T')[0];
      return itemDateStr === dateStr;
    });
    return found ? found.status : null;
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 className='m-3'>{t('Manage Tutor Availability')}</h2>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={30}
        dateFormat="Pp"
        inline
        dayClassName={(date) => {
          const status = getStatus(date);
          if (status === 'available') return 'available';
          if (status === 'booked') return 'booked';
          if (status === 'unavailable') return 'unavailable';
          return '';
        }}
      />

      {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          <h3>
            {t('Selected Date')}: {selectedDate.toDateString()}
          </h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={handleAddAvailability}>{t('Add')}</button>
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
              <option value="available">{t('Available')}</option>
              <option value="booked">{t('Booked')}</option>
              <option value="unavailable">{t('Unavailable')}</option>
            </select>
            <button onClick={handleUpdateStatus}>{t('Update')}</button>
            <button onClick={handleRemoveAvailability}>{t('Remove')}</button>
          </div>
        </div>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentBookings.map((request) => (
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
              {new Date(request.booking_date).toLocaleString("fr-FR", {
                timeZone: 'UTC',
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
            <div style={{ fontSize: '15px', color: '#333' }}>

              <Link to={`/user/${request.user_id}`}>  <h5 className="mt-3 fw-bold">  <strong>👤 {request.name}</strong></h5></Link>
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
                onClick={() => handleAccept(request.id, request.requested_date)}
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
                {t('Decline')}
              </button>
            </div>
          </li>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            {t('Previous')}
          </button>
          <button onClick={() => setCurrentPage((p) => (indexOfLastBooking < pendingBookings.length ? p + 1 : p))}
            disabled={indexOfLastBooking >= pendingBookings.length}>
            {t('Next')}
          </button>
        </div>
      </ul>
    </div>
  );
}
