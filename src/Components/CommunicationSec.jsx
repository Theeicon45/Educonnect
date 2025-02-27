import { useState } from "react";
import MessageSection from "../TeacherComponents/MessageSection";
import AnnouncementSection from "../TeacherComponents/AnnouncementSection";
import LeaveApplicationSection from "../TeacherComponents/LeaveApplicationSection";


export default function CommunicationSec() {
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <div className="w-full p-4">
      {/* Navigation Tabs */}
      <div className="flex border-b">
        {["messages", "announcements", "applications"].map((tab) => (
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
        {activeTab === "messages" && <MessageSection />}
        {activeTab === "announcements" && <AnnouncementSection />}
        {activeTab === "applications" && <LeaveApplicationSection />}
      </div>
    </div>
  );
}
