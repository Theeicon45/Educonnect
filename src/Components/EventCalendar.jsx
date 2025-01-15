"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { moredark } from "../Utils/images";

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]); // State to store events

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token for authentication
        const response = await fetch("http://localhost:3000/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data); // Update state with fetched events
        } else {
          console.error("Failed to fetch events:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Run only once when the component mounts

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={setValue} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <img src={moredark} alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-green-300 even:border-t-purple-300"
              key={event.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.Title}</h1>
                <span className="text-xs text-gray-300">
                  {new Date(event.Event_Date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">{event.Description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
