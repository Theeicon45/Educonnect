import { useState } from "react";
import MessageSection from "../TeacherComponents/MessageSection";
import AnnouncementSection from "../TeacherComponents/AnnouncementSection";
import Reminder from "./Reminder";


export default function SCommunicationSec() {
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <div className="w-full p-4">
      {/* Navigation Tabs */}
      <div className="flex border-b">
        {["Reminders", "messages", "announcements"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 p-3 text-center capitalize ${
              activeTab === tab ? "border-b-4 border-blue-500 font-semibold" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Section Rendering */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        {activeTab === "Reminders" && <Reminder />}
        {activeTab === "messages" && <MessageSection />}
        {activeTab === "announcements" && <AnnouncementSection />}
      </div>
    </div>
  );
}
