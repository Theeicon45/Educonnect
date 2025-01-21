"use client";

import { moredark } from "../Utils/images";

const LeaveRequests = [
  {
    id: 1,
    teacher: "John Doe",
    date: "2024-12-29",
    reason: "Medical leave for surgery.",
    status: "Pending",
  },
  {
    id: 2,
    teacher: "Jane Smith",
    date: "2024-12-30",
    reason: "Personal leave for family event.",
    status: "Approved",
  },
  {
    id: 3,
    teacher: "Mike Johnson",
    date: "2024-12-28",
    reason: "Vacation leave.",
    status: "Rejected",
  },
];

const LeaveRequestsComponent = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Leave Requests</h1>
        <img src={moredark} alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 ">
        {LeaveRequests.map((request) => (
          <div
            className="p-5 rounded-md border-2 shadow-md border-gray-100 border-t-4 odd:border-t-purple-300 even:border-t-green-300"
            key={request.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{request.teacher}</h1>
              <span className="text-xs text-gray-300">{request.date}</span>
            </div>
            <p className="m-2 text-gray-400 text-sm">{request.reason}</p>
            <span
              className={`text-xs font-semibold p-2   rounded-md border-2 border-gray-100 ${
                request.status === "Pending"
                  ? "border-t-yellow-500"
                  : request.status === "Approved"
                  ? "border-t-green-500"
                  : "border-t-Red-500"
              }`}
            >
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequestsComponent;
