import React from "react";

const notifications = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    description:
      "The system will be down for maintenance on January 2nd from 1:00 AM to 3:00 AM.",
    date: "2025-01-02",
    color: "bg-Orange-100",
  },
  {
    id: 2,
    title: "New Policy Update",
    description:
      "A new leave policy has been implemented starting January 2025. Please review the guidelines.",
    date: "2025-01-01",
    color: "bg-cyan-100",
  },
  {
    id: 3,
    title: "Upcoming Event: Annual Meeting",
    description:
      "The annual staff meeting will be held on January 15th. Attendance is mandatory.",
    date: "2025-01-15",
    color: "bg-Red-100",
  },
];

const Notification = () => {
  return (
    <div className="bg-white p-4  rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <span className="text-xs text-gray-400 cursor-pointer">View all</span>
      </div>

      {/* Notification List */}
      <div className="flex flex-col gap-4 mt-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${notification.color} rounded-md p-4 shadow-md`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-700">{notification.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                {notification.date}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {notification.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
