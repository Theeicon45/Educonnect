"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { moredark } from "../Utils/images";

const Events = [
  {
    id: 1,
    title: "Lorem ipsum dolor.",
    time: "12:00 AM - 03:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, excepturi?",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor.",
    time: "12:00 AM - 03:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, excepturi?",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor.",
    time: "12:00 AM - 03:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, excepturi?",
  },
];

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="bg-white p-4  rounded-md">
      <Calendar onChange={setValue} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <img src={moredark} alt=""  width={20} height={20}/>
      </div>
      <div className="flex flex-col gap-4">
        {Events.map((event) => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-tahiti-300 even:border-t-Red-300" key={event.id}>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-xs text-gray-300">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
