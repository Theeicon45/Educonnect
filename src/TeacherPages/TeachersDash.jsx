import React from "react";
import EventCalendar from "../Components/EventCalendar";
import Announcements from "../Components/Announcements";

const TeachersDash = () => {
  return (
    <div className="flex gap-4 p-4 md:flex-row">
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">left</div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default TeachersDash;
