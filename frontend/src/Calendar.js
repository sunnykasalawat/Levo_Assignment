import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" 
import './Calendar.css';
import Event_popup from './Event_popup';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchHolidays();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/holidays');
      const data = await response.json();
      if (Array.isArray(data)) {
        setHolidays(data);
      } else {
        console.error('Unexpected response format for holidays:', data);
        setHolidays([]);
      }
    } catch (error) {
      console.error('Error fetching holidays:', error);
      setHolidays([]);
    }
  };
  

  const handleDateClick = (info) => {
    console.log(info.dataStr)
    const dateStr = info.dateStr;
    setSelectedDate(dateStr);
    filterEventsByDate(dateStr);
  };

  const filterEventsByDate = (date) => {
    const filtered = events.filter(event =>
      new Date(event.start_date).toISOString().split('T')[0] === date
    );
    setFilteredEvents(filtered);
    console.log(filtered)
  };  

  const Events = [
    ...events.map(event => ({
      title: event.title,
      start: event.start_date,
      end: event.end_date,
      backgroundColor: '#378006', // Custom color for events
      borderColor: '#2f6d02', // Border color for events
      textColor: '#ffffff'    // Text color for events
    }))];
  

  const Holdiayevents=[
    ...holidays.map(holiday => ({
      title: holiday.name,
      start: holiday.date,
      end: holiday.date,
      backgroundColor: '#FF5733', // Custom color for holidays
      borderColor: '#c44231', // Border color for holidays
      textColor: '#ffffff'  ,// Text color for holidays
    }))
  ];
  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event.id); // Log the event ID
    setSelectedEventId(info.event.id);
    setIsModalOpen(true);
  };


  const openModal = (eventsn) => {
    setSelectedEventId(eventsn);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };


  
  return (
    <div className="full-calendar-page">
      <div className="calendar-container">
        <h2 className="calendar-title">Monthly Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          aspectRatio={1.25}
          events={Holdiayevents}
          dateClick={handleDateClick}
        />
      </div>
      <div className="event-list-container">
        <h2 className="event-list-title">Event List</h2>
        {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event.sn} className="event-list-item" onClick={() => openModal(event.sn)}>
                <div className="event-list-item-title">{event.title}</div>
                <div className="event-list-item-date">
                  {formatDate(event.start_date)} - {formatDate(event.end_date)}
                </div>
                <div className="event-list-item-description">{event.description}</div>
              </div>
            ))
          ) : (
            <p>No events on this date</p>
          )}
      </div>


      <Event_popup isOpen={isModalOpen} onClose={closeModal} eventId={selectedEventId} />
    </div>
  );
}

export default Calendar;
