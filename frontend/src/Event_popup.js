// Popup.js
import React, { useEffect, useState } from 'react';
import './Event_popup.css'; // Create a CSS file for styling the popup

const Event_popup = ({ isOpen, onClose, eventId }) => {
  const [event, setEvent] = useState(null);
  const [eventemail, setEventEmail] = useState(null);

  useEffect(() => {
    if (isOpen && eventId) {
      fetchEventDetails(eventId);
      fetchEmail(eventId);
    }
  }, [isOpen, eventId]);

  const fetchEventDetails = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`http://127.0.0.1:5000/api/events/${id}`);
      const data = await response.json();
      console.log('Fetched event data:', data.sn); // Log the fetched data for debugging
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const fetchEmail= async (id) => {
    try {
      console.log(id)
      const response = await fetch(`http://127.0.0.1:5000/api/events/Email/${id}`);
      const data = await response.json();
      console.log(data)
      setEventEmail(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };



  if (!isOpen || !event) {
    return null;
  }

  return (
    <div className="popup-overlay">
    <div className="popup-content">
      <button className="popup-close" onClick={onClose}>X</button>
      <h3>{event.title}</h3>
      <p><strong>Date:</strong> {event.start_date} - {event.end_date}</p>
      <p><strong>Description:</strong> {event.description}</p>
      {eventemail && (
          <div className="email-container">
            <p><strong>Email:</strong></p>
            <div className="email-scroll">
              {eventemail.map((email,index)=>(
                <div key={index} className="email-item">{email.email_address}</div>
            ))}
            </div>
          </div>
        )}
    </div>
  </div>
  );
};

export default Event_popup;
